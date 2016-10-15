var nodemailer = require('nodemailer');
var Contract = require('../models/Contract');

/**
 * POST /contact
 */
exports.createContract = function(req, res, next) {
    var contract = new Contract({
        address: req.body.address,
        pricePerShare: req.body.pricePerShare,
        duration: req.body.duration,
        numOfShares: req.body.numOfShares
    });

    contract.save(function(err, contract) {
      res.send({ contract: contract });
    });
};

exports.loadContracts = function(req,res,next){
    Contract.find({}, function(err, contracts){
       res.send(contracts); 
    });
}
