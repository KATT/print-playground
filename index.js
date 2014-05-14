var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var print = require('./lib/print');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser())

app.post('/print', function(req, res) {
	var str = req.body.string;
	if (str) {
		print(str);
	}
	res.writeHead(301, {"Location": "/"});
  res.end();
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
