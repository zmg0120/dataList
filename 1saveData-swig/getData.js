const fs = require("fs");
const readline = require("readline");
const filename = "./writeLine.data";

const getData = function(cb){
	const readStream = fs.createReadStream(filename);
	const readLineObj = readline.createInterface({
		input: readStream,
		output: null
	});
	const resData = [];

	readLineObj.on("line", (chunk) => {
		const tmp = JSON.parse(chunk);
		resData.push(tmp);
	});

	readStream.on("end", () => {
		cb(resData);
	});
}

module.exports = getData;