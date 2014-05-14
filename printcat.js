var print = require('./lib/print');
var fs = require('fs');

var DEVICE_ADDRESS = '8ca6bb1717f0a6fa';

var cat = fs.readFileSync('cat.txt', 'utf8');

print(cat);
