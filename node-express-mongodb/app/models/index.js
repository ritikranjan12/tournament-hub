const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tournament = require("./tournament.js")(mongoose);
mongoose.set('strictQuery', false);

module.exports = db;
