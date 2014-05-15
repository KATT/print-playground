// split a string up by chunks of max length in bytes
var splitStringByBytes = function(string, maxByteLength) {
	var chunks = [];

	var strBuffer = '';

	var len = string.length;
	
	for (var i = 0; i < len; i++) {
		var chr = string[i];
		if (Buffer.byteLength(strBuffer+chr) > maxByteLength) {
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

module.exports = splitStringByBytes;
