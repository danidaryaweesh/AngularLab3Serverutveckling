/**
 * Created by dani on 2016-12-13.
 */

var app = angular.module('myApp',[]);
var login = false;

app.controller('personCtrl', function($scope) {

    $scope.username=getUrlParameter('username');
    $scope.password="";
    $scope.to="";
    $scope.messageText="";
    $scope.message="begining";
    $scope.id = Math.floor((Math.random() * 10000000) + 1).toString();

    var taskSocket = new WebSocket("ws://130.229.183.91:1337");

    taskSocket.onmessage = function(message) {
        if(message.data.indexOf("/wrong password") >=0){
            console.log("redirecting!");
            $scope.password="";
            window.location = "/chat.html";
        }else {
            $scope.message = message.data;
            var para = document.createElement("P");
            var t = document.createTextNode($scope.message);
            para.appendChild(t);
            document.getElementById("chatbox").appendChild(para);
            $scope.$apply();
        }
    };

    taskSocket.onclose = function() {
        $scope.message = {
            type: "danger",
            short: "Socket error",
            long: "An e startrror occured with the WebSocket."
    };

        $scope.username="SOCKET CLOSED!";
        $scope.$apply();
    };

    $scope.send = function () {
        var body=$scope.messageText;
        var messageToSend = JSON.stringify({from : $scope.username, body: body, to: $scope.to, id: $scope.id, password: $scope.password, option:""});
        taskSocket.send(messageToSend);

        var para = document.createElement("P");
        var t = document.createTextNode($scope.username+": "+$scope.messageText);
        para.appendChild(t);
        document.getElementById("chatbox").appendChild(para);

        $scope.messageText = "";
    };

    $scope.toggle = function () {

        var form= document.getElementById('info');
        if (form.style.display === 'block' || form.style.display === '')
            form.style.display = 'none';
        else
            form.style.display = 'block';

        var button = document.getElementById('infoButton');

        if (button.style.display === 'block' || button.style.display === '')
            button.style.display = 'none';
        else
            button.style.display = 'block';

        var messageToSend = JSON.stringify({name : $scope.username, to: $scope.to, id: $scope.id, password: $scope.password, option:"connect"});
        taskSocket.send(messageToSend);

    };

    $scope.register = function () {
        var registerMessage = JSON.stringify({username: $scope.username, password: $scope.password, option: "register"});
        taskSocket.send(registerMessage);

        var form = document.getElementById('info');
        if (form.style.display === 'block' || form.style.display === '')
            form.style.display = 'none';
        else
            form.style.display = 'block';

        var form2 = document.getElementById('wrapper');
        if (form2.style.display === 'block' || form2.style.display === '')
            form2.style.display = 'none';
        else
            form2.style.display = 'block';

        var form3 = document.getElementById('loginForm');
        if (form3.style.display === 'block' || form3.style.display === '')
            form3.style.display = 'none';
        else
            form3.style.display = 'block';

    };

    $scope.login = function () {
        var loginMessage = JSON.stringify({username: $scope.username, password: $scope.password, id: $scope.id ,option: "login"});
        taskSocket.send(loginMessage);

        var form = document.getElementById('info');
        if (form.style.display === 'block' || form.style.display === '')
            form.style.display = 'none';
        else
            form.style.display = 'block';

        var form2 = document.getElementById('wrapper');
        if (form2.style.display === 'block' || form2.style.display === '')
            form2.style.display = 'none';
        else
            form2.style.display = 'block';

        var form3 = document.getElementById('loginForm');
        if (form3.style.display === 'block' || form3.style.display === '')
            form3.style.display = 'none';
        else
            form3.style.display = 'block';
    };

    function getUrlParameter(param, dummyPath) {
        var sPageURL = dummyPath || window.location.search.substring(1),
            sURLVariables = sPageURL.split(/[&||?]/),
            res;

        for (var i = 0; i < sURLVariables.length; i += 1) {
            var paramName = sURLVariables[i],
                sParameterName = (paramName || '').split('=');

            if (sParameterName[0] === param) {
                res = sParameterName[1];
            }
        }
        return res;
    }
});