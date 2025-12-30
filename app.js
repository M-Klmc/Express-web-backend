import express from 'express';
import { config } from 'dotenv';

import { connectToDB } from './source/models/__loaddatabase.js';
import router from './source/router.js';

import cors from 'cors';

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

config();

const port = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors())

app.locals.appTitle = process.env.APPTITLE || 'Express';

(async () => {
    await connectToDB();
    app.use('/', router);
    app.listen(port);
})();