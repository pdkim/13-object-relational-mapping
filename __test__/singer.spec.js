'use strict';
/*Mockgoose will behave the same as mongoose but in memory.  easier to see in memory

afterAll can be run outside of describe

beforeAll ran inside describe

models will not have status code.  be aware of that

mockgoose will not actually add into the database because of afterAll
*/

require('babel-register');

const superagent = require('superagent');
const app = require('../src/app.js');

