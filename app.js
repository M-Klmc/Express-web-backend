// express.js

import express from 'express';
import { config } from 'dotenv';

import './source/models/__loaddatabase.js';
import { mainPage, detailPage } from './source/controllers.js';
import router from './source/router.js';

config();

const port = process.env.PORT || 8000;

const app = express();

app.use('/', router);

app.listen(port);
