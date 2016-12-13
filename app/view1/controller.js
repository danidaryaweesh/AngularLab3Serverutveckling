/**
 * Created by dani on 2016-12-13.
 */

var app = angular.module('myApp',[]);

app.controller('personCtrl', function($scope, $http) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.messageText="Write a message...";
    
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    };

    var taskSocket = new WebSocket("ws://localhost:1337");

    taskSocket.onmessage = function(message) {
        $scope.tasks = JSON.parse(message.data);
        $scope.$apply();
        $scope.lol = $scope.tasks;
    };

    taskSocket.onclose = function() {

        $scope.message = {
            type: "danger",
        short: "Socket error",
        long: "An error occured with the WebSocket."
    };
        $scope.$apply();
    };

    $scope.send = function () {
        var from="Dodo";
        var to="abas";
        var body=$scope.messageText;
        var messageToSend = JSON.stringify({from : from, body: body, to: to});
        taskSocket.send(messageToSend);
        $scope.messageText = "";
    };
});


