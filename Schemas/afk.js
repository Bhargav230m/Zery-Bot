const { model, Schema } = require("mongoose");

let AFK = new Schema({
  Guild: String,
  User: String,
  Afk: Boolean,
});

module.exports = model("AFK", AFK);
