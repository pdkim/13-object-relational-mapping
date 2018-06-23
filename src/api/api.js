'use strict';

import express from 'express';
const router = express.Router();
// import workers from '../models/worker.js';

import modelFinder from '../middleware/models.js';
router.param('model', modelFinder);

let sendJSON = (res, data) => {
  res.status(200);
  res.json(data);
};

//GET ONE
router.get('/api/v1/:model/:id', (req, res, next) => {
  req.model.findById(req.params.id)
    .then(data => {
      sendJSON(res, data);
    })
    .catch(next);
});

//GET ALL
router.get('/api/v1/:model', (req, res) => {
  req.model.find({})
    .then(data => res.send(data))
    .catch(next);
});

//DELETE
router.delete('/api/v1/:model/:id', (req, res, next) => {
  req.model.findOneAndDelete(req.params.id)
    .then(() => {
      res.statusCode = 204;
      res.statusMessage = 'OK';
      res.end();
    })
    .catch(next);
});

//POST
router.post('/api/v1/:model', (req, res, next) => {
  let record = new req.model(req.body);

  record.save()
    .then(data => sendJSON(res, data))
    .catch(next);
});

router.put('/api/v1/:model/:id', (req, res, next) => {
  req.model.findOneAndUpdate(req.params.id, req.body)
    .then((data) => {
      sendJSON(res, data);
    })
    .catch(() => {
      next();
    });
});


export default router;