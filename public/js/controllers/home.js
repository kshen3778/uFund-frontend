angular.module('MyApp').controller('HomeCtrl', function($scope, $rootScope, $location, $window, $auth, Account, Contract, BusinessInfo) {

    $scope.theuser = $rootScope.currentUser;

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
            console.log(response);
            for (var a = 0; a < response.data.length; a++) {
                var contractInfo = response.data[a];
                
                var businessPurchaseDates = [];
                var businessPurchaseValues = [];
                BusinessInfo.getInfo(response.data[0].address).then(function(response) {
                    for (var i = 0; i < response.data[a].length; i++) {
                        businessPurchaseDates.push(response.data[a].date);
                        businessPurchaseValues.push(response.data[a].value);
                    }
                });
                contractInfo.chartLabels = businessPurchaseDates;
                contractInfo.chartData = businessPurchaseValues;
                /*$scope.contracts = response.data;
                $scope.contracts = data: {
                    labels: ['Item 1', 'Item 2', 'Item 3'],
                    data: [10, 20, 30]
                }*/
                $scope.contracts.push(contractInfo);
            }
        });
    };

    $scope.businessContracts = [];
    console.log($rootScope.currentUser);
    if ($rootScope.currentUser) {
        Contract.loadBusinessContracts($rootScope.currentUser.address).then(function(response) {
            console.log(response);
            $scope.businessContracts = response.data;
        });
    }
});