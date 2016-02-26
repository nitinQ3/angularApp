var myApp = angular.module("mainApp", ['ngRoute']);
         myApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.                      
            when('/index', {
                
               templateUrl: 'home.html',
               controller: 'homeController'
            }).
            when('/addUser', {
                
               templateUrl: 'addUser.html',
               controller: 'addUserController'
            }).
            when('/userGrid', {
               templateUrl: 'userGrid.html',
               controller: 'userGridController'
            }).
            when('/userInfo', {
               templateUrl: 'userInfo.html',
               controller: 'userInfoController'
            }).
            otherwise({
               redirectTo: '/index'
            });
         }]);
        
         myApp.controller('myController', function($scope) {
           // $scope.message = "Home Page Content";
         });         