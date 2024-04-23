import 'dotenv/config';

import * as express from 'express';
import * as session from 'express-session';
import * as cors from 'cors';

import { randomUUID } from 'crypto';
import { Database } from './src/modules/utils/Database';

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
    const allowedOrigins = ['http://localhost']; //change to deployed origin
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

import { AuthController } from './src/controllers/AuthController';
import { UserController } from './src/controllers/UserController';
import { MessageController } from './src/controllers/MessageController';
import { GatewayController } from './src/controllers/GatewayController';

app.use('/login', AuthController);
app.use('/users', UserController);
app.use('/message', MessageController);
app.use('*', GatewayController);

app.listen(process.env.GATEWAY_PORT, async () => {
    await Database.connect();
});
