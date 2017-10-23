'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

//---------VVVV---------  your code below  ---------VVV----------

var Task = db.define('Task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  due: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  timeRemaining: {
    type: Sequelize.NUMERIC,
    get () {
      if (!this.getDataValue('due')) return Infinity;
      return this.getDataValue('due') - new Date();
    }
  },
  overdue: {
    type: Sequelize.BOOLEAN,
    get () {
      if (this.getDataValue('complete')) return false;
      if (this.timeRemaining < 0) return true;
      return false;
    }
  }
});

Task.clearCompleted = function () {
  return Task.destroy(
    { where: { complete: true } }
  );
};

Task.completeAll = function () {
  return Task.update(
    { complete: true },
    { where: { complete: false } }
  );
};

Task.prototype.addChild = function (attr) {
  let parentTask = this;
  return Task.create(attr)
    .then(function (task) {
      return task.setParent(parentTask);
    });
};

Task.prototype.getChildren = function () {
  return Task.findAll(
    {
      where: {
        parentId: this.id
      }
    }
  );
};

Task.prototype.getSiblings = function () {
  return Task.findAll(
    {
      where: {
        parentId: this.parentId,
        id: {
          $ne: this.id
        }
      }
    }
  );
};

Task.hook('beforeDestroy', function (task) {
  return Task.destroy(
    { where: { parentId: task.id } }
  );
});


//---------^^^---------  your code above  ---------^^^----------

Task.belongsTo(Task, {as: 'parent'});

module.exports = Task;

