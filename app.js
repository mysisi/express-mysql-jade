var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');

//mysql
var connection = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: 'liuxi',
	database: 'liuxi',
	// connectionLimit: 10,
	// supportBigNumbers: true
});

//static
app.use(express.static('static'));

//view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
	connection.query('SELECT * FROM users', function(err, rows, fields) {
		res.render('index', {
			users: rows
		});
	})
});

var server = app.listen(8081, function() {
	var port = server.address().port
	console.log("应用实例，访问地址为 http://127.0.0.1:%s", port)
})