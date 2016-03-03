var myApp = angular.module("mainApp", ['ngRoute']);
var userLoginToken = '';
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
                    url: "serverScript/Users/userLogin",
                    data: $scope.form,
                    method: 'POST',
                    headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
                 }).success(function(data){
                     if(data.message.error){
                       $scope.errorMsg =   data.message.error;
                     } else {
                       userLoginToken = data.userLoginToken;
                       $window.location.href = '#/userGrid';
                      }
                    });
              };
         });
         
         myApp.controller('addUserController', function($scope, $http, $window) { 
             if(userLoginToken!=''){
             $scope.addUserForm = function(){
                 $http({
                    url: "serverScript/Users/addUser/"+userLoginToken,
                    data: $scope.form,
                    method: 'POST',
                    headers : {'Content-Type':'application/application/json; charset=UTF-8'}                       
                 }).success(function(data){
                    if(data.message.sessionExpire){
                        alert(data.message.sessionExpire);
                        $window.location.href = '#/index';
                    } else {
                     $scope.form = '';
                     $scope.successMsg = "<strong>Success!</strong> User has been added.";
                    }
                    });
             };
            } else {
                $window.location.href = '#/index';
            }
         });
         
         myApp.controller('userInfoController',function($scope, $http, $routeParams, $window) { 
             if(userLoginToken!=''){
             $http({
                    url: "serverScript/Users/userDetail/"+$routeParams.id,                    
                    method: 'GET',
                    headers : {'Content-Type':'application/application/json; charset=UTF-8'}
                 }).success(function(data){
                     $scope.userDetails = data;
                    });
               } else {
                   $window.location.href = '#/index';
            }
         }); 
         
          myApp.controller('userGridController', function($scope, $http, $window) {
              if(userLoginToken!=''){
              $http({
                    url: "serverScript/Users/userList/"+userLoginToken,
                    data: $scope.form,
                    method: 'GET'
                 }).success(function(data){                     
                     if(typeof Object.keys(data) === 'undefined'){
                           $scope.noData = data.message.error;
                     }
                    else if(data.hasOwnProperty(data.message.sessionExpire)){
                        alert(data.message.sessionExpire);
                        $window.location.href = '#/index';
                    }
                    else {
                        $scope.users = data;
                     }
                    });
                } else {
                    $window.location.href = '#/index';
                }
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