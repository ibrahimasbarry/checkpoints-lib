var express = require('express');
var router = express.Router();

var Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */

 router.get('/articles', (req, res, next) => {
   Article.findAll()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch(next);
 });

router.get('/articles/:id', (req, res, next) => {
  Article.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((article) => {
      if (!article) res.sendStatus(404);
      else res.status(200).json(article);
    })
    .catch(next);
});

router.post('/articles', (req, res, next) => {
  Article.findOrCreate({
    where: {
      title: req.body.title,
      content: req.body.content
    }
  })
    .then((article) => {
      let retObj = {};
      retObj.message = 'Created successfully';
      retObj.article = article[0];
      res.status(200).json(retObj);
    })
    .catch(next);
});

router.put('/articles/:id', (req, res, next) => {
    Article.findOne({
    where: {
      id: req.params.id
    }
  })
    .then((article) => {
      if (!article) {
        res.sendStatus(404);
      }
      else {
        article.update(req.body)
          .then(updatedArticle => {
            let retObj = {};
            retObj.message = 'Updated successfully';
            retObj.article = updatedArticle;
            res.status(200).json(retObj);
          })
          .catch(next);
      }
    })
    .catch(next);
});

module.exports = router;
