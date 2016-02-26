var myApp = angular.module("mainApp", ['ngRoute']);
         myApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.                      
            when('/index', {
                
               templateUrl: 'pages/home.html',
               controller: 'homeController'
            }).
            when('/addUser', {
                
               templateUrl: 'pages/addUser.html',
               controller: 'addUserController'
            }).
            when('/userGrid', {
               templateUrl: 'pages/userGrid.html',
               controller: 'userGridController'
            }).
            when('/userInfo', {
               templateUrl: 'pages/userInfo.html',
               controller: 'userInfoController'
            }).
            otherwise({
               redirectTo: '/index'
            });
         }]);
        
         myApp.controller('myController', function($scope) {
            
         });   
         myApp.controller('addUserController', function($scope) {
            $scope.firstName = "Nitin";
            $scope.lastName = "Koundal";
            $scope.username = "nkkoundal";
            $scope.email = "nkkoundal@q3tech.com";
            $scope.role = "Developer";            
         });