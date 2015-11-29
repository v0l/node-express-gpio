var fs = require('fs');
var http = require('http');

var express = require("express");
var app = express();

app.get('/api/:pin/direction/:value', function(req, res) {
	var df = '/sys/class/gpio/gpio' + req.params.pin + '/direction';
	fs.stat(df, function(err, stats) {
		if(err === null)
		{
			if(req.params.value === 'in' || req.params.value === 'out')
			{
				fs.writeFile(df, req.params.value);
				res.json({
					ok: true,
					error: null,
				});
			}else{
				res.json({
					ok: false,
					error: 'Invalid direction, must be in/out',
				});
			}
		}
		else
		{
			res.json({
				ok: false,
				error: err,
			});
		}
	});
});

app.get('/api/:pin/value/:value', function(req, res) {
	var df = '/sys/class/gpio/gpio' + req.params.pin + '/value';
	fs.stat(df, function(err, stats) {
		if(err === null)
		{
			if(req.params.value === '1' || req.params.value === '0')
			{
				fs.writeFile(df, req.params.value);
				res.json({
					ok: true,
					error: null,
				});
			}else{
				res.json({
					ok: false,
					error: 'Invalid value, must be 1/0',
				});
			}
		}
		else
		{
			res.json({
				ok: false,
				error: err,
			});
		}
	});
});

var server = app.listen(8080, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('node-express-gpio listening on %s:%s', host, port);
});