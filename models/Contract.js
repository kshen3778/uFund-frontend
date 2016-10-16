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
    name: { type: String, unique: true},
    businessname: String,
    businessaddress: String,
    shareAddresss: String,
    saleAddress: String,
    shareholderAddress: String,
    pricePerShare: Number,
    duration: Number,
    numOfShares: Number,
    totalShares: Number
}, schemaOptions);


var Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;