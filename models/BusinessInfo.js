var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;
var http = require('http');

http.get({
  hostname: 'api.etherscan.io',
  path: '/api?module=contract&action=getabi&address=0x5b57e235618560e61DA0D37Df616459fa0a455BC',
}, (data) => {
  console.log(data);
});