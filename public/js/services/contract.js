angular.module('MyApp')
  .factory('Contract', function($http) {
    return {
      sendContract: function(data) {
        console.log(data);
        return $http.post('/contract', data);
      },
      loadContracts: function(data){
        return $http.get('/contracts');
      },
      loadBusinessContracts: function(address){
        return $http.get('/contracts/' + address);
      }
    };
  });