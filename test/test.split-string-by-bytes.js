var stringBytechunk = require('../lib/split-string-by-bytes');

var assert = require("assert");

describe('string-bytechunk', function(){
	it('should return one chunk if less bytes than specified', function(){
		var str = 'abc';
		assert.deepEqual(stringBytechunk(str, 4), [str]);
	})
	it('should return one chunk if equal bytes as specified', function(){
		var str = 'abc';
		assert.deepEqual(stringBytechunk(str, 3), [str]);
	})
	it('should chunk up in multiple chunks', function(){
		assert.deepEqual(stringBytechunk('abcdef', 3), ['abc', 'def']);
		assert.deepEqual(stringBytechunk('abcdefg', 3), ['abc', 'def', 'g']);
	})
})