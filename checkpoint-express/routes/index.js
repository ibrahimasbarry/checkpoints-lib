'use strict';

var express = require('express');
var router = express.Router();
var todos = require('../models/todos');
// module.exports = router;

// write your routes here. Feel free to split into multiple files if you like.

router.get('/users', function (req, res) {
  res.status(200).send(todos.listPeople());
});

router.get('/users/:name/tasks', function(req, res){
  let name = req.params.name;

  if (todos.listPeople().indexOf(name) < 0) {
    // user doesn't exists
    res.status(404).send();
    return;
  }

  if (!req.query.status) {
    // we don't have query to parse
    res.status(200).send(todos.list(name));
    return;
  }

  // we have query to parse
  let complete = (req.query.status === 'complete');
  let taskArr = [];
  if (name && todos.list(name)) {
    todos.list(name).forEach(function(task){
      if (task.complete === complete) taskArr.push(task);
    });
  }
  res.status(200).send(taskArr);
});

router.post('/users/:name/tasks', function (req, res){
  let name = req.params.name;

  // invalid key handling
  var invalidKey = true;
  Object.keys(req.body).forEach(function (key) {
    if (key !== 'content' && key !== 'complete') {
      res.status(400).send();
      invalidKey = false;
    }
  });
  if (!invalidKey) return;

  // add task to person
  let complete = req.body.complete;
  if (complete === undefined) complete = false;
  let task = {content: req.body.content, complete: complete};
  if (name && task) todos.add(name, task);
  res.status(201).send(task);
});

router.put('/users/:name/tasks/:index', function (req, res){
  let name = req.params.name;
  let index = req.params.index;
  if (name && index) todos.complete(name, index);
  res.status(200).send();
});

router.delete('/users/:name/tasks/:index', function (req, res){
  let name = req.params.name;
  let index = +req.params.index;
  if (name && index) todos.remove(name, index);
  res.status(204).send();
});

router.use(express.static('public'));

module.exports = router;
