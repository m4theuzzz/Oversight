import 'dotenv/config';

import * as express from 'express';
import * as session from 'express-session';
import * as cors from 'cors';

import { randomUUID } from 'crypto';

const app = express();

const sess = {
    secret: 'keybord cat',
    genid: () => randomUUID(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60,
    }
}

if (process.env.ENV === 'production') {
    const allowedOrigins = ['http://localhost:3000']; //change to deployed origin
    app.use(cors({
        origin: function (origin: any, callback: any) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg = 'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.';
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    }));

    app.set('trust proxy', 1);
    sess.cookie.secure = true;
} else {
    app.use(cors());
}

app.use(session(sess));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb' }));

import { ProducerController } from './src/controllers/ProducerController';
import { FallbackController } from './src/controllers/Fallback'
import { Postgres } from './src/modules/utils/Postgres';
import { Consumer } from './src/modules/Consumer';
import { Producer } from './src/modules/Producer';

app.use('/message', ProducerController);
app.use('*', FallbackController);

app.listen(process.env.API_PORT, async () => {
    await Postgres.connect();
    await Producer.connect();
    await Consumer.connect();
    console.log(`A API está online na porta: ${process.env.API_PORT}`);
});
