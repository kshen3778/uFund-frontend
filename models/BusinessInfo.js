var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
var version = web3.version.api;
var http = require('http');

var options = {
  hostname: 'testnet.etherscan.io',
  path: '/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest'
};

http.get(options, function(res) {
  var body = '';
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {
    var contractABI = "";
    contractABI = JSON.parse(body).result;
    console.log(contractABI);
    if (contractABI != '') {
      var MyContract = web3.eth.contract(contractABI);
      console.log(MyContract.eth.coinbase);
      //var myContractInstance = MyContract.at("0xfb6916095ca1df60bb79ce92ce3ea74c37c5d359");
      //var result = myContractInstance.memberId("0xfe8ad7dd2f564a877cc23feea6c0a9cc2e783715");
      //console.log("result1 : " + result);            
      //var result = myContractInstance.members(1);
      //console.log("result2 : " + result);
    }
    else {
      console.log("Error");
    }
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});