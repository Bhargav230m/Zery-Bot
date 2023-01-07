const { model, Schema } = require("mongoose");

let welcome = new Schema({
  Guild: String,
  Channel: String,
  Role: String,
});

module.exports = model("welcome", welcome);
