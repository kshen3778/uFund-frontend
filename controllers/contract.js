var nodemailer = require('nodemailer');
var Contract = require('../models/Contract');
var Business = require('../models/Business');

/**
 * POST /contact
 */
exports.createContract = function(req, res, next) {
    console.log(req.body);
    var contract = new Contract({
        name: req.body.name,
        businessname: req.body.businessname,
        address: req.body.address,
        pricePerShare: req.body.pricePerShare,
        duration: req.body.duration,
        numOfShares: req.body.numOfShares,
        totalShares: req.body.totalShares
    });

    contract.save(function(err, contract) {
        console.log(contract);
        Business.findOne({
            address: req.body.address
        }, function(err, business) {
            business.shares += (req.body.totalShares - req.body.numOfShares);
            business.save(function(err, business2) {
                console.log(contract);
                res.send({
                    contract: contract
                });
            });
        });
    });
};

exports.loadContracts = function(req, res, next) {
    Contract.find({}, function(err, contracts) {
        res.send(contracts);
    });
};

exports.loadBusinessContracts = function(req, res, next) {
    Contract.find({
        address: req.params.address
    }, function(err, contracts) {
        res.send(contracts);
    });
};
