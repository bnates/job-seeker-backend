'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  companies: { type: Array },
  userId: { type: Schema. Types.ObjectId, required: true },
});

module.exports = mongoose.model('profile', profileSchema);