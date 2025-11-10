// express.js

import express from 'express';
import { config } from 'dotenv';

import './source/models/__loaddatabase.js';
import { mainPage } from './source/controllers.js';

config();

const port = process.env.PORT || 8000;

const app = express();

app.get('/', mainPage);

app.listen(port);
