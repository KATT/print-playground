var querystring = require('querystring');
var http = require('http');

var DEVICE_ADDRESS = '8ca6bb1717f0a6fa';

var print = function(string) {
	string = string.replace(/(\r\n|\n|\r)/gm, "\n");

	console.log('string to be printed:');
	console.log(string);
	console.log('string end');

	var postData = {
		address: DEVICE_ADDRESS,
		payload: JSON.stringify(string.split("\n")),
	};

	var rawPostData = querystring.stringify(postData);


	var options = require('url').parse('http://api.bergcloud.com/v1/projects/739901e219ce0415fe626fd9615abe12/display-text');
	options.method = 'POST';

	options.headers = options.headers || {};

	options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
	options.headers['Content-length'] = Buffer.byteLength(rawPostData, 'utf8') ;

	console.log('options:', options);
	// Set up the request
	var post_req = http.request(options, function(res) {
		res.setEncoding('utf8');
		console.log('Response status:', res.headers.status);
		res.on('data', function (chunk) {
			console.log('Response:', chunk);
		});
		res.on('end', function() {
			console.log('Response end!');
		});
	});


	console.log('raw post', rawPostData);
	console.log('characters:', string.length);

	console.log('postdata size:', Buffer.byteLength(postData.payload, 'utf8'));

	// post the data
	post_req.write(rawPostData);
	post_req.end();
};

module.exports = print;
