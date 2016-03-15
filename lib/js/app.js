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
              if(userLoginToken == ''){
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
          } else{
              $window.location.href = "#/userGrid"; 
          }
         });
         
         myApp.controller('addUserController', function($scope, $http, $window) { 
             
             $scope.addUserForm = function(){
                 $http({
                    url: "serverScript/Users/addUser/"+userLoginToken,
                    data: $scope.form,
                    method: 'POST',
                    headers : {'Content-Type':'application/application/json; charset=UTF-8'}                       
                 }).success(function(data){
                    if( typeof data.message !== 'undefined'){
                        if(typeof data.message.success !== 'undefined') {
                          $scope.form = '';
                          $scope.successMsg = data.message.success;
                    } else {
                        $scope.errorMsg = data.message.error;
                    }
                   }
                });
             };            
         });
         
         myApp.controller('userInfoController',function($scope, $http, $routeParams, $window) {
             if(userLoginToken!=''){
             $http({
                    url: "serverScript/Users/userDetail/"+userLoginToken+"/"+$routeParams.id,                    
                    method: 'GET',
                    headers : {'Content-Type':'application/application/json; charset=UTF-8'}
                 }).success(function(data){
                     if(typeof data.message !== 'undefined'){
                         if(typeof data.message.error !== 'undefined'){
                            $scope.userDetails = data;
                         } else if(typeof data.message.sessionExpire !== 'undefined'){
                            alert(data.message.sessionExpire);
                            userLoginToken = '';
                            $window.location.href = '#/index';
                         }
                    } else {
                             $scope.userDetails = data;
                         }
                    });
               } else {
                   userLoginToken = '';
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
                     if(typeof data.message !== 'undefined'){
                         if(typeof data.message.error !== 'undefined'){
                          $scope.noData = data.message.error;
                         } else if(typeof data.message.sessionExpire !== 'undefined') {
                             alert(data.message.sessionExpire);
                             userLoginToken = '';
                             $window.location.href = '#/index';
                         }
                     }
                    else {
                        $scope.users = data;
                     }
                    });
                } else {
                    userLoginToken = '';
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