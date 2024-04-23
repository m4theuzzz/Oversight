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

import { CompanyController } from './src/controllers/CompanyController';
import { CustomerController } from './src/controllers/CustomerController';
import { AddressController } from './src/controllers/AddressController';
import { ServiceController } from './src/controllers/ServiceController';
import { BudgetController } from './src/controllers/BudgetController';
import { BudgetServiceController } from './src/controllers/BudgetServiceController';
import { MailerController } from './src/controllers/MailerController';
import { FallbackController } from './src/controllers/Fallback';

app.use('/mail', MailerController);
app.use('/companies', CompanyController);
app.use('/customers', CustomerController);
app.use('/customers', AddressController);
app.use('/services', ServiceController);
app.use('/budgets', BudgetController);
app.use('/budgets', BudgetServiceController);
app.use('*', FallbackController);

app.listen(process.env.API_PORT, async () => {
    await Database.connect();
    console.log(`A API está online na porta: ${process.env.API_PORT}`);
});
