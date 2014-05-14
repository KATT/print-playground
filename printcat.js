var print = require('./lib/print');
var fs = require('fs');

var cat = fs.readFileSync('./fixtures/cat.txt', 'utf8');

print(cat);
