angular.module('MyApp').controller('HomeCtrl', function($scope, $rootScope, $location, $window, $auth, Account, Contract) {
      
      $scope.theuser = $rootScope.currentUser;
      
      $scope.sendContract = function(){
          $scope.contract.address = $rootScope.currentUser.address;
          
          console.log($scope.contract);
          Contract.sendContract($scope.contract).then(function(response){
              
          });
      };
      
});