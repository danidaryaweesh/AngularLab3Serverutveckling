/**
 * Created by dani on 2016-12-13.
 */
var app = angular.module('myApp',[]);

app.controller('personCtrl', function($scope) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    };
});


