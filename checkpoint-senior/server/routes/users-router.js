import express from 'express';
import db from '../models';
const User = db.model('user');
const Message = db.model('message');

// This router is already mounted on /users in server/app.js
const router = express.Router();

export default router;

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.status(200).send(users))
    .catch(next);
});

router.put('/:userId', (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => user.update(req.body))
    .then(() => res.sendStatus(201))
    .catch(next);
})
