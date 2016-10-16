var nodemailer = require('nodemailer');
var Contract = require('../models/Contract');
var Business = require('../models/Business');
var ethController = require('../uFund/ethContract');

/**
 * POST /contact
 */
exports.createContract = function(req, res, next) {
    console.log(req.body);
    var contract = new Contract({
        name: req.body.name,
        businessname: req.body.businessname,
        businessaddress: req.body.businessaddress,
        pricePerShare: req.body.pricePerShare,
        duration: req.body.duration,
        numOfShares: req.body.numOfShares,
        totalShares: req.body.totalShares
    });

    
        Business.findOne({
            address: req.body.businessaddress
        }, function(err, business) {
            business.shares += (req.body.totalShares - req.body.numOfShares);
            business.save(function(err, business2) {
                
                var info = {
                    name: contract.businessname,
                    address: contract.businessaddress,
                    numShares: contract.totalShares,
                    numSelling: contract.numOfShares,
                    price: contract.pricePerShare,
                    duration: contract.duration
                };
                ethController.createContract(info, function(err, addresses){
                    contract.saleAddress = addresses.saleAddress;
                    contract.shareholderAddress = addresses.shareholderAddress;
                    contract.shareAddress = addresses.shareAddress;
                    
                    contract.save(function(err, contract) {
                        console.log(contract);
                        res.send({
                            contract: contract
                        });
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
