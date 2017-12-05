const fs = require("fs");
const readline = require("readline");

const filename = "./writeLine.data";

const getData = function(needWrite,cb){
	const jsonStr = JSON.stringify(needWrite) + "\n";
	fs.writeFile(filename, jsonStr, {flag:"a"}, (err) => {
		if(err){
			console.log("writeFile err", err);
			return cb(err, null);
		}
		//创建读取流
		const readStream = fs.createReadStream(filename);
		//创建readlline 
		const readlineObj = readline.createInterface({
			input: readStream,
			output: null
		});
		const resData = [];
		//监听line事件 逐行读取
		readlineObj.on("line", (chunk) => {
			//将读取的json字符串转为对象 添加到resData数组中
			resData.push(JSON.parse(chunk.toString())); 
		});

		//监听读取流结束事件
		readStream.on("end",() => {
			// 并返回数组
			cb(null, resData);
		});
	})
}

module.exports = getData;