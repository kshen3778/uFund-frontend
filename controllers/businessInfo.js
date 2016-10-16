var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;
var request = require('request');
var address = '0x2b645ae3bce483b26b65b934513af0228f46bdfa';


exports.getInfo = function(req, res, next) {
  request('http://testnet.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&page=1&offset=10&sort=asc', function(error, response, body) {
      var transactionsArr = [];
      if (!error && response.statusCode == 200) {
        var parsedBody = JSON.parse(body).result;
        for (var i = 0; i < parsedBody.length; i++) {
          if (parsedBody[i].value != 0) {
            var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(parsedBody[i].timeStamp);
            transactionsArr.push({
              "date:": d,
              "value": parsedBody[i].value
            });
          }
        }
      }
      else {
        console.log("YOU SCREWED UP: " + body);
      }
      res.send(transactionsArr);
    });
    /*
    request('https://testnet.etherscan.io/api?module=account&action=balance&address=0x5b57e235618560e61DA0D37Df616459fa0a455BC&tag=latest', function (error, response, body) {
      var MyContract = web3.eth.contract(JSON.parse(body).result);
      console.log(MyContract.eth.hashrate);
    });*/

};