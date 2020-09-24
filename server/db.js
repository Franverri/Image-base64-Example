require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/imgbase64`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const Image = sequelize.define('image', {
  // Tu código acá:
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.BLOB
  }
});

module.exports = {
  Image,
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
