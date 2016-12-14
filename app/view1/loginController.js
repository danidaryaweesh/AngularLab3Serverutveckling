/**
 * Created by dani on 2016-12-14.
 */
var app = angular.module('loginModule',[]);

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
        socket.addSocket("ws://localhost:1337");

        window.location.href = "chat.html";

        //    }
    };
});

/*
 toggle example!
 <script>
 var toggle = function() {
 var mydiv = document.getElementById('newpost');
 if (mydiv.style.display === 'block' || mydiv.style.display === '')
 mydiv.style.display = 'none';
 else
 mydiv.style.display = 'block';

 var d = document.getElementById('f');
 if (d.style.display === 'block' || d.style.display === '')
 d.style.display = 'none';
 else
 d.style.display = 'block'
 }
 </script>
 <div id="newpost" style="display: none;">asdf</div>
 <input id="but" type="button" value="btn" onclick="toggle();">

 */