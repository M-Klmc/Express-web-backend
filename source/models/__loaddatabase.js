// database load module
import { join } from 'node:path';
import { readFileSync } from 'node:fs';

import { currentDir } from '../utility.js';

const dataFileName = join(currentDir, 'data', 'todos.json');

const dataFile = readFileSync(dataFileName, 'utf-8');
const database = JSON.parse(dataFile);

export { database };
