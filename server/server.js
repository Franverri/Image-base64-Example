const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const { Image } = require('./db.js');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.json({
    msg: 'App running'
  })
});

app.get('/images', (req, res) => {
  Image.findAll().then((images) => {
    if(images) {
      var arrayData = images.map(img => img.data.toString('utf8'));
      res.send(arrayData);
    } else {
      res.status(404).send('No files uploaded!');
    }
  })
});

app.post('/image', (req, res) => {
  if(req.body && req.body.image.name && req.body.image.data) {
    Image.create({
      name: req.body.image.name,
      data: req.body.image.data
    }).then(image => {
      return res.send('File ' + image.name + ' uploaded!');
    }).catch(err => {
      return res.json(err);
    });
  } else {
    return res.send('No file provided');
  }
});

module.exports = app;
