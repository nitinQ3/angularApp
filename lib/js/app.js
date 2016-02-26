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
         myApp.controller('addUserController', function($scope, $http) {
//             var userData = {
//                    firstName: "default",
//                    lastName : "default",
//                    username : "default",
//                    email : "default",
//                    role : "default"            
//             };
             $scope.addUserForm = function(){
                 $http({
                    url: "serverScript/Users/addUser",
                    data: $scope.form,
                    method: 'POST',
                    headers : {'Content-Type':'application/application/json; charset=UTF-8'}                       
                 }).success(function(data){
                     $scope.successMsg = "<strong>Success!</strong> User has been added.";
                    })  
             };
             
         });