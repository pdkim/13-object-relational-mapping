'use strict';

require('babel-register');

const superagent = require('superagent');
import superT from 'supertest';
import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';

const { server } = require('../src/app.js');
const apiURL = 'api/v1/workers';
const mockgoose = new Mockgoose(mongoose);
const supertest = superT(server);


describe('API module should', () => {

  beforeAll((done) => {
    mockgoose.prepareStorage().then(() => {
      mongoose.connect('mongodb://localhost/lab-13');
      done();
    });
  });

  afterEach((done) => {
    mockgoose.helper.reset().then(() => {
      done();
    });
  });


  xit('return 404 if no id is found in database', () => {
    return supertest.get(`${apiURL}/1111`)
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('{"error":"Resource Not Found"}');
      });
  });


  xit('return 400 error when attempting to post empty object', () => {
    return supertest.post(apiURL)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Bad Request');
      });
  });


  xit('return 200 when post is valid', () => {
    let workerData = {
      firstName: 'Phil',
      lastName: 'Kim',
      hourlyWage: '50',
    };

    return supertest.post(apiURL)
      .send(workerData)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Phil');
      });
  });


  xit('be able to find an object when passing a valid id with 200 status code', () => {
    let workerData = {
      firstName: 'Phillip',
      lastName: 'Kim',
      hourlyWage: '20',
    };

    return supertest.post(apiURL)
      .send(workerData)
      .then(response => {
        let id = JSON.parse(response.text)._id;
        return superagent.get(`${apiURL}/${id}`)
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.text).toEqual('[]');
          });
      });
  });


  xit('return 404 when attempting to update a non-existing object', () => {
    return supertest.put(apiURL)
      .then(response => {
        expect(response.statusCode).toBe(404);
        expect(response.text).toBe('resource not found');
      });
  });


  xit('return 400 if updating existing data with nothing', () => {
    let workerData = {
      firstName: 'Phillip',
      lastName: 'Kim',
      hourlyWage: '20',
    };

    return supertest.post(apiURL)
      .send(workerData)
      .then(response => {
        let id = JSON.parse(response.text)._id;
        return superagent.put(`${apiURL}/${id}`)
          .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.text).toBe('Bad Request');
          });
      });
  });


  xit('update an existing object with new data and return 200', () => {
    let workerData = {
      firstName: 'Phillip',
      lastName: 'Kim',
      hourlyWage: '20',
    };

    let workerUpdate = {
      firstName: 'Phil',
      lastName: 'K',
      hourlyWage: '200',
    };

    return supertest.post(apiURL)
      .send(workerData)
      .then(response => {
        let id = JSON.parse(response.text)._id;
        return superagent.put(`${apiURL}/${id}`)
          .send(workerUpdate)
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.text).hourlyWage).toBe('200');
          });
      });
  });
})