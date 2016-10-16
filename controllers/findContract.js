var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;
var request = require('request');
var address = '0x318091D491ee6035e83f98BC5533b3798C0f74c0';


  request('http://testnet.etherscan.io/api?module=account&action=txlist&address=' + address + '&startblock=0&endblock=99999999&page=1&offset=10&sort=asc', function(error, response, body) {
      var transactionsArr = [];
      if (!error && response.statusCode == 200) {
        console.log(body);
        var parsedBody = JSON.parse(body).result;
        var valueCount = 0;
        for (var i = 0; i < parsedBody.length; i++) {
          if (parsedBody[i].value != 0) {
              valueCount += parsedBody[i].value/1000000000000000000;
          }
        }
      }
      else {
        console.log("YOU SCREWED UP: " + body);
      }
      //res.send(transactionsArr);
    });
    /*
    request('https://testnet.etherscan.io/api?module=account&action=balance&address=0x5b57e235618560e61DA0D37Df616459fa0a455BC&tag=latest', function (error, response, body) {
      var MyContract = web3.eth.contract(JSON.parse(body).result);
      console.log(MyContract.eth.hashrate);
    });*/