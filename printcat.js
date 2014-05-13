var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

var DEVICE_ADDRESS = '8ca6bb1717f0a6fa';

var cat = fs.readFileSync('cat.txt', 'utf8');

var postData = {
	address: DEVICE_ADDRESS,
	payload: JSON.stringify(cat.split("\n")),
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
});


console.log('raw post', rawPostData);
console.log('characters:', cat.length);

console.log('postdata size:', Buffer.byteLength(postData.payload, 'utf8'));

// post the data
post_req.write(rawPostData);
post_req.end();


