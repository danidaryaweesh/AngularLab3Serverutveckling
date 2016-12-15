/**
 * Created by dani on 2016-12-13.
 */

var app = angular.module('myApp',[]);
var login = false;

/*
app.controller('loginController', function($scope, socket, $location) {

    $scope.username="";
    $scope.password="";
    $scope.test="woho!";

    // var taskSocket = new WebSocket("ws://localhost:1337");

    $scope.login = function () {
    //    if(login){
    //        console.log("You are already logged in");
    //    }else{
            // fixa logg in grejerna
            /*   var loginMesssage = JSON.stringify({username : $scope.username, password: $scope.password});
             task.send(loginMesssage);
             console.log("Logg in succesfull").then(function (data) {
             if(data == true){
             console.log("Logged in successfully!");
             login = true;
             $window.location.href = '/chat.html';
             }else{
             console.log("Coldnt log in!");
             }
             }); */
        //    socket.addSocket("ws://localhost:1337");

        //    window.location.href = "chat.html";
    //    }
//    };
// });

/*
app.service('socket', function($window) {

    var key='object';

    var addSocket = function (newObj) {
        var objectData = $window.sessionStorage.getItem(key);
        if(objectData){
            objectData = JSON.parse(objectData);
        }else{
            objectData = [];
        }
        var web = new WebSocket(newObj);
        objectData.push(web);
        $window.sessionStorage.setItem(key, JSON.stringify(objectData));
    };

    var getSocket = function () {
        var objectData = $window.sessionStorage.getItem(key);
        if(objectData){
            objectData =  JSON.parse(objectData);
        }
        return objectData || [];
    };

    return{
        addSocket: addSocket,
        getSocket: getSocket
    };
}); */

app.controller('personCtrl', function($scope) {

    $scope.to="";
    $scope.messageText="";
    $scope.message="begining";
    $scope.id=Math.floor((Math.random() * 10000000) + 1).toString();

    var taskSocket = new WebSocket("ws://localhost:1337");


   taskSocket.onmessage = function(message) {
       var wholeMessage = JSON.parse(message.data);

       console.log("In else");
       var from = wholeMessage.from;
       var body = wholeMessage.body;
       $scope.message = from+":"+body;
       console.log("in else from: "+from + " ,body: "+body +" ,$scope.to: "+$scope.to);
       var para = document.createElement("P");
       var t = document.createTextNode($scope.message);
       para.appendChild(t);
       document.getElementById("chatbox").appendChild(para);
       $scope.$apply();
       $scope.message = "";
    };

    taskSocket.onclose = function() {

        $scope.message = {
            type: "danger",
            short: "Socket error",
            long: "An e startrror occured with the WebSocket."
    };
        $scope.$apply();
    };

    $scope.send = function () {
        var body=$scope.messageText;
        var messageToSend = JSON.stringify({from : $scope.username, body: body, to: $scope.to, id: $scope.id});
        taskSocket.send(messageToSend);

        var para = document.createElement("P");
        var t = document.createTextNode($scope.username+": "+$scope.messageText);
        para.appendChild(t);
        document.getElementById("chatbox").appendChild(para);

        $scope.messageText = "";
    };

    $scope.toggle = function () {
        // toggle and register $scope.to..
        // .
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

        var messageToSend = JSON.stringify({name : $scope.username, to: $scope.to, id: $scope.id});
        taskSocket.send(messageToSend);
    };
});


/*
 <!DOCTYPE html>
 <html lang="en">
 <head>
 <meta charset="UTF-8">
 <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
 <script src="bower_components/angular-websocket/dist/angular-websocket.js"></script>
 <script src="view1/controller.js"></script>
 <title>Home Page</title>
 </head>

 <body>

 <div ng-app="myApp" ng-controller="personCtrl">


 Message: <input type="text" ng-model="messageText">
 <br /><br />
 <button ng-click='send()'>Send Message</button>
 <br /> <br /> <br />
 Message: {{task}}

 <div>



 </div>


 </div>

 </body>

 </html>
 */