angular.module('MyApp')
  .factory('Contract', function($http) {
    return {
      sendContract: function(data) {
        return $http.post('/contract', data);
      },
      loadContracts: function(data){
        return $http.get('/contracts');
      }
    };
  });