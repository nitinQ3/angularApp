var myApp = angular.module("mainApp", ['ngRoute']);
         myApp.config(['$routeProvider', function($routeProvider) {
            $routeProvider.
            when('/index', {
               templateUrl: 'pages/home.html',
               controller: 'loginController'
            }).
            when('/addUser', {
               templateUrl: 'pages/addUser.html',
               controller: 'addUserController'
            }).
            when('/userGrid', {
               templateUrl: 'pages/userGrid.html',
               controller: 'userGridController'
            }).
            when('/userInfo/:id', {
               templateUrl: 'pages/userInfo.html',
               controller: 'userInfoController'
            }).
            otherwise({
               redirectTo: '/addUser'
            });
         }]);
        
         myApp.controller('myController', function($scope) {
             
         }); 
         
          myApp.controller('loginController', function($scope,$http, $window) {
              $scope.userLogin = function(){
                     $http({
                    url: "serverScript/Users/login",
                    data: $scope.form,
                    method: 'POST',
                    headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
                 }).success(function(data){ 
                     $window.location.href = '#/userGrid';
                        console.log(data);                     
                     //$scope.successMsg = "<strong>Success!</strong> User has been added.";
                    })
              };
         }); 
         
         myApp.controller('addUserController', function($scope, $http) {
             $scope.addUserForm = function(){
                 $http({
                    url: "serverScript/Users/addUser",
                    data: $scope.form,
                    method: 'POST',
                    headers : {'Content-Type':'application/application/json; charset=UTF-8'}                       
                 }).success(function(data){ console.log(data);
                     $scope.form = '';
                     $scope.successMsg = "<strong>Success!</strong> User has been added.";
                    })  
             };
             
         });
         
         
         myApp.controller('userInfoController',function($scope, $http, $routeParams) { 
             
             $http({
                    url: "serverScript/Users/userDetail/"+$routeParams.id,                    
                    method: 'GET',
                    headers : {'Content-Type':'application/application/json; charset=UTF-8'}
                 }).success(function(data){
                     $scope.userDetails = data;
                    });
         });
         
         
          myApp.controller('userGridController', function($scope, $http) {
              $http({
                    url: "serverScript/Users/userList",
                    data: $scope.form,
                    method: 'GET'
                 }).success(function(data){                     
                     if(data!=''){
                     $scope.users = data;
                     } else {
                         $scope.noData = "<strong>No data available.</strong>";
                     }
                    });
          });
          
         myApp.filter('capitalize', function () {
            return function (token) {
            return token.charAt(0).toUpperCase() + token.slice(1);
             }
        });
        
        myApp.filter('unsafe', function ($sce) {
            return function (val) {
            return $sce.trustAsHtml(val);
             }
        });