const http = require("http");
const fs = require('fs');
const mime = require("mime");
const path = require("path");
const saveData = require("./saveData.js");
const getData = require("./getData.js");
const swig = require("swig");

const dispathStatic = (req, res, cb) => {
	if(req.url.startsWith("/static/")){
		console.log(req.url);
		let fileType = mime.getType(req.url);
		let absPath = path.join(__dirname,req.url);
		res.writeHead(200,{"Content-Type":fileType});
		fs.readFile(absPath,(err,data) => {
			if(err){
				throw err;
			}
			res.end(data);
		});
		cb(true);
	} else {
		cb(false);
	}
}

const server = http.createServer((req,res) => {
	dispathStatic(req, res, (static) => {
		if(static){
			return;
		}
		// console.log(req.method);
		if(req.url === "/all"){
			const filename = "./all.html";
			getData(function(data){
				// console.log(data);
				const tpl = swig.compileFile(filename);
				const resData = tpl({data:data});
				res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
				res.write(resData);
				res.end();
			});
		} else if (req.url === "/add"){
			//post请求
			if (req.method.toLowerCase() === "post") {
				console.log("POST");
				res.writeHead(200,{"Content-Type":"text/html"});
				let body = "";
				req.setEncoding("utf-8");
				req.on("data", (chunk) => {
					body += chunk;
				});
				req.on("end", () => {
					try {
						//把从前台的数据转换为对象
						let data = JSON.parse(body);
						// console.log(data);
						// console.log(typeof data); //object 
						saveData(data, (err, resData) => {
							// resData = [{name:"zhang",age:"20"},{},...]
							/*
							for (let data of resData){
								let resStr = "<h1>你的信息:</h1><ul>";
								for(let key in data){
									resStr += "<li>KEY: " + key + " VALUE: " + data[key] + "</li>";
								}
								resStr += "</ul>";
								res.write(resStr);
							}*/
							res.write("true");
							res.end();
						});
					} catch(e) {
						console.log(e);
						res.end("error");
					}
				});
			//get请求
			} else if (req.method.toLowerCase() === "get") {
				var filename = "./post.html";
				res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
				fs.readFile(filename, (err,data) => {
					res.write(data);
					res.end();
				})
			}
		//错误处理
		} else {
			res.writeHead(404,{"Content-Type":"text/html;charset=utf-8"});
			res.end("NOTFOUND");
		} 
	});
})
server.listen(8000);
console.log("Sever is listening on 8000");
