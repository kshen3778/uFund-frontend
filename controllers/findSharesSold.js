var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider());
var version = web3.version.api;
var request = require('request');
var address = '0x2b645ae3bce483b26b65b934513af0228f46bdfa';

exports.getInfo = function(req, res, next) {

    request('https://testnet.etherscan.io/api?module=account&action=balance&address=0x5b57e235618560e61DA0D37Df616459fa0a455BC&tag=latest', function(error, response, body) {
        var MyContract = web3.eth.contract(JSON.parse(body).result);
        MyContract.eth.filter({
            fromBlock: 0,
            toBlock: 'latest',
            address: contractAddress,
            'topics': ['0x' + web3.sha3('newtest(string,uint256,string,string,uint256)')]
        });
        filter.watch(function(error, result) {})
    });
}
