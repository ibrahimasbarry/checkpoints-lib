'use strict';

var tasks = {}; // a place to store tasks by person

module.exports = {
  reset: function () {
    tasks = {}; // (this function is completed for you.)
  },
  // ==== COMPLETE THE FOLLOWING (SEE `model.js` TEST SPEC) =====
  listPeople: function () {
    // returns an array of all people for whom tasks exist
    return Object.keys(tasks);
  },
  add: function (name, task) {
    // saves a task for a given person
    if (task) {
      if (task.complete === undefined) task.complete = false;
    }
    if (!tasks[name]) tasks[name] = [task];
    else tasks[name].push(task);
  },
  // etc.
  list: function (name) {
    return tasks[name];
  },
  complete: function (name, taskIndex) {
    if (!tasks[name]) return;
    if (!tasks[name][taskIndex]) return;
    tasks[name][taskIndex].complete = true;
  },
  remove: function (name, taskIndex) {
    if (!tasks[name]) return;
    if (!tasks[name][taskIndex]) return;
    let retTasks = [];
    tasks[name].forEach(function (task, index) {
      if (index !== taskIndex) retTasks.push(task);
    });
    tasks[name] = retTasks;
  }
};
