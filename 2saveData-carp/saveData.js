const fs = require("fs");
const readline = require("readline");
const filename = "./writeLine.data";

const saveData = function(needWrite,cb){
	const jsonStr = JSON.stringify(needWrite) + "\n";
	fs.writeFile(filename, jsonStr, {flag:"a"}, (err) => {
		if(err){
			console.log("writeFile err", err);
			return cb(err);
		}
		cb(null);
	})
}

module.exports = saveData;