// split a string up by chunks of max length in bytes
var stringBytechunk = function(string, length) {
	var chunks = [];

	var strBuffer = '';

	var len = string.length;
	
	for (var i = 0; i < len; i++) {
		var chr = string[i];
		if (Buffer.byteLength(strBuffer+chr) > length) {
			chunks.push(strBuffer);
			strBuffer = chr;
		} else {
			strBuffer += chr;
		}
	}

	if (strBuffer) {
		chunks.push(strBuffer);
	}



	return chunks;
};

module.exports = stringBytechunk;
