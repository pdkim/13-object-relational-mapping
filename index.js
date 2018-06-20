'use strict';

require('dotenv').config();

import app from './src/app.js';

app.start(process.env.PORT);