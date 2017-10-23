'use strict';

var db = require('./database');
var Sequelize = require('sequelize');

// Make sure you have `postgres` running!

var User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

var Article = db.define('article', {
  title: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  snippet: {
    type: Sequelize.VIRTUAL,
    get () {
      let content = this.getDataValue('content');
      if (!content) return '';
      return content.slice(0, 23) + '...';
    }
  },
  version: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: [],
    get () {
      return this.getDataValue('tags').join(', ');
    }
  }
});

Article.beforeValidate((article) => {
  if (!article.title) throw Error('validation error');
});


Article.prototype.truncate = function (length) {
  if (!this.content) return;
  this.content = this.content.slice(0, length);
};

Article.findByTitle = (title) => {
  return Article.findOne({
    where: {
      title
    }
  });
};

Article.belongsTo(User, {as: 'author'});

Article.prototype.update = function (updateFields) {
  var fieldKeys = Object.keys(updateFields);
  for (let i = 0; i < fieldKeys.length; i++) {
    let fieldKey = fieldKeys[i];
    this[fieldKey] = updateFields[fieldKey];
  }
  this.version++;
  return this.save();
};

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
