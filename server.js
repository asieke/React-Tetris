require('dotenv').config()
const Sequelize = require('sequelize');
const sequelize = new Sequelize('tetris', process.env.DB_USER, process.env.DB_PASS, {
  dialect: 'postgres',
  host: process.env.DB_HOST
})
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const HighScore = sequelize.define('HighScore', {
  userName: Sequelize.STRING,
  score: Sequelize.INTEGER,
  lines: Sequelize.INTEGER
})


app.use(express.static('client/dist'));

app.post('/highscore', (req, res) => {
  Promise.resolve(req.body.score > 0 ? HighScore.create(req.body) : 0)
    .then(() => {
      return HighScore.findAll({ limit: 10, order: [['score', 'DESC']] })
    })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.sendStatus(500)
    });
})

HighScore.sync().then(() => {
  app.listen(port, () => {
    console.log('Server is running at http://localhost:' + port);
  });
})