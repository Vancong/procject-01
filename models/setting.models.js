const mongoose = require("mongoose");
const settingSchema = new mongoose.Schema({
  websiteName: String,
  email: String,
  phone: String,
  address: String,
  copyright: String,
  logo: String,

}, {
  timestamps: true
});

const setting = mongoose.model("setting", settingSchema, "setting");

module.exports = setting;