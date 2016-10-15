angular.module('MyApp')
  .controller('HeaderCtrl', function($scope, $location, $window, $auth, $route) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/');
      $window.location.reload();
    };
    $scope.reloadRoute = function() {
      $window.location.reload();
    };
  });