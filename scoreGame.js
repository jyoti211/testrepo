var db = require('./db.js');
var io = require('socket.io');
var express = require('express');
var sockets = io.listen(9090);

// serveur html
var server= express();

server.get('/', function (req, res) {
	res.sendfile('./scoreGame.html');
	});

server.get('/scoreGame.html', function(request, response) {
 response.sendfile('./scoreGame.html');
});
// serveur socket.io
sockets.on('connection', function (socket) {
	 socket.on('saveScore', function (data) {
	db.connect('localhost','root','root','game');
	var sqlSelect = "select id,email,score from scores where email='" + data.email + "'";
	db.executeSelectQuery(sqlSelect, enregistrerScore, data);
  });
});

var enregistrerScore = function( results, data ) {
  if ( empty(results)  ) {
	  var sqlInsert = "insert into scores (email,score,date) values('" + data.email + "','" + data.score + "',NOW()) ";
    db.executeInsertQuery(sqlInsert);
  } else {
	if ( results[0].score < data.score ) {
      var sqlUpdate = "update scores set score=" + data.score + ",date=NOW() where email='" + data.email + "' ";
	  console.log(sqlUpdate);
      db.executeUpdateQuery(sqlUpdate);
	}
  }
  db.close();
}
  
/*var whenResult = function( data, results ) {
  if ( empty(results)  ) {
    var sqlInsert = "insert into scores (email,score,date) values('" + data.email + "'," + data.score + ",NOW()) ";
    db.executeInsertQuery(sqlInsert);
  } else {
    var sqlUpdate = "update scores set score=" + data.score + ",date=NOW() where email='" + data.email + "' ";
    db.executeUpdateQuery(sqlUpdate);
  }
  db.close();
}*/
  
var empty = function empty(object) {
  for (var i in object) 
    if (object.hasOwnProperty(i))
      return false;
 
  return true;
}
server.listen(3080);
  