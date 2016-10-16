angular.module('MyApp').controller('HomeCtrl', function($scope, $rootScope, $location, $window, $auth, Account, Contract, BusinessInfo) {

    $scope.theuser = $rootScope.currentUser;
    Chart.defaults.global.colors = ['#5cb360', '#DCDCDC', '#00ADF9', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];
    $scope.sendContract = function() {
        $scope.contract.address = $rootScope.currentUser.address;
        $scope.contract.businessname = $rootScope.currentUser.name;
        console.log($scope.contract);
        Contract.sendContract($scope.contract).then(function(response) {
            $rootScope.currentUser.shares += ($scope.contract.totalShares - $scope.contract.numOfShares);
            $scope.theuser = $rootScope.currentUser;
        });
    };

    $scope.address = "";
    $scope.contracts = [];

    $scope.loadContracts = function() {
        Contract.loadContracts().then(function(response) {
                response.data.forEach(function(item){
                BusinessInfo.getInfo(item.address).then(function(res) {
                    var contractInfo = item;
                    //console.log(contractInfo);
                    var businessPurchaseDates = [];
                    var businessPurchaseValues = [];
                    
                    for (var i = 0; i < res.data.length; i++) {
                        businessPurchaseDates.push(res.data[i].date);
                        businessPurchaseValues.push(Integer.parseInt(res.data[i].value));
                    }
                    contractInfo.chartLabels = businessPurchaseDates;
                    contractInfo.chartData = businessPurchaseValues;
                    $scope.contracts.push(contractInfo);
                    console.log($scope.contracts);
                });
            });
        });
    };

    $scope.businessContracts = [];
    if ($rootScope.currentUser) {
        Contract.loadBusinessContracts($rootScope.currentUser.address).then(function(response) {
            console.log(response);
            $scope.businessContracts = response.data;
        });
    }
});