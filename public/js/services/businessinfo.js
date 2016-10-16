angular.module('MyApp').factory('BusinessInfo', function($http) {
    return {
      getInfo: function(address) {
        return $http.get('/businessinfo/' + address);
      }
    };
  });