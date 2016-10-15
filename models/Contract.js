var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
};

var contractSchema = new mongoose.Schema({
    address: String,
    pricePerShare: Number,
    duration: Number,
    numOfShares: Number
}, schemaOptions);


var Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;