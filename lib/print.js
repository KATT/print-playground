var querystring = require('querystring');
var http = require('http');
var async = require('async');

var splitStringByBytes = require('./split-string-by-bytes');

var PROJECT_ID = '5a283d9accb620676f05ca822fd79893';
var BERG_API_TOKEN = 'e00611b6-f7ccdab1-fb9d1087-4320070a';
var DEVICE_ID = 'OYELV';

var COMMAND_NAME = 'print';


var PAYLOAD_MAX_SIZE = Buffer.byteLength('abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvxyzabc');

var COMMAND_TYPES = {
	CHUNK: 0,
	LAST_CHUNK: 1
};

var postPayload = function(payload, callback) {

	var postData = {
		device_id: DEVICE_ID,
		name: COMMAND_NAME,
		payload: payload
	};

	var rawPostData = JSON.stringify(postData);
	

	var options = require('url').parse('http://api.bergcloud.com/api/v2/projects/'+PROJECT_ID+'/commands');
	options.method = 'POST';

	options.headers = options.headers || {};

	options.headers['Accept'] = 'application/json';
	options.headers['Content-Type'] = 'application/json';
	options.headers['Content-length'] = Buffer.byteLength(rawPostData);
	options.headers['Berg-API-Token'] = BERG_API_TOKEN;



	// console.log('options:', options);
	// Set up the request
	var post_req = http.request(options, function(res) {
		res.setEncoding('utf8');
		// console.log('Response status:', res.headers.status);
		res.on('data', function (chunk) {
			// console.log('Response:', chunk);
		});
		res.on('end', function() {
			// console.log('Response end!');
			if (callback) {
				if (res.headers.status == 200) {
					callback(null);
				} else {
					callback(res.headers.status);
				}
				
			}
		});
	});


	// console.log('postData', postData);
	// console.log('rawPostData', rawPostData);

	// console.log('postData size:', options.headers['Content-length']);

	// post the data
	post_req.write(rawPostData);
	post_req.end();
};


// curl -X POST "http://api.bergcloud.com/api/v2/projects/5a283d9accb620676f05ca822fd79893/commands"
//  -H "Accept: application/json"
//  -H "Content-Type: application/json" 
//  -H "Berg-API-Token: e00611b6-f7ccdab1-fb9d1087-4320070a" 
//  -d '{ "device_id": "OYELV", "name": "print", "payload": [ "test string"]}'
var print = function(string) {
	string = string.replace(/(\r\n|\n|\r)/gm, "\n");

	console.log('string to be printed:');
	console.log(string);
	console.log('string end');

	var chunks = splitStringByBytes(string, PAYLOAD_MAX_SIZE);

	var series = [];

	var len = chunks.length;
	chunks.forEach(function(chunk, i) {
		var isLast = (i == len-1);
		var commandType = isLast ? COMMAND_TYPES.LAST_CHUNK : COMMAND_TYPES.CHUNK;
		var payload = [commandType, chunk];

		series.push(function(callback) {
			console.log('posting payload:', payload);
			postPayload(payload, callback);
		})
	});

	async.series(series, function(err, results) {
		console.log('print done!', err, results);
	});
};

module.exports = print;
