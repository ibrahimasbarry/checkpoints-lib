import express from 'express';
import db from '../models';
const Message = db.model('message');
const User = db.model('user');

// This router is already mounted on /messages in server/app.js
const router = express.Router();

export default router;

router.get('/to/:recipientId', (req, res, next) => {
  Message.findAll({
    where: {
      toId: req.params.recipientId
    },
    include: [
      { model: User, as: 'to' },
      { model: User, as: 'from' }
    ]
  })
    .then(messages => res.status(200).send(messages))
    .catch(next);
});

router.get('/from/:senderId', (req, res, next) => {
  Message.getAllWhereSender(req.params.senderId)
    .then(messages => res.status(200).send(messages))
    .catch(next);
});

router.post('/', (req, res, next) => {
  Message.create(req.body)
    .then(message => res.status(201).send(message))
    .catch(next);
})
