const carp = require("../lib/carp");
const fs = require("fs");
// const url = require("url");
// const saveData = require("../saveData"); 
// const saveData = require("../saveToMongo"); 
const getDataById = require("../getDataById");
const modifyDataById = require("../modifyDataById");
const swig = require("swig");


class Modify extends carp.Controller {
	get() {
		console.log(this.req.url);
		// const urlObj = url.parse(this.req.url,"parseQueryString"); 
		//  query: { id: '59e0ba729a037932f86d0358' },

		const urlObj = this.req.urlStruct;
		// console.log("url:::",urlObj);
		const id = urlObj.query.id;

		getDataById(id, function(data) {
			// console.log("data: ", data);
			const filename = "./modifypost.html";
			const tpl = swig.compileFile(filename);
			const resData = tpl({data: data});
			this.setHtml(resData);
			this.endHtml();
		}.bind(this));	
	}
	put() {
		let body = ""
		this.req.setEncoding("utf8");
		this.req.on("data", (chunk) => {
			body += chunk;
		});
		this.req.on("end", () => {
			const doc = JSON.parse(body);
			// console.log(doc);
			modifyDataById(doc, (err) => {
				if(err) {
					return this.event.emit("error", "500", this.res);
				}
				this.setHtml("true");
				this.endHtml();
			});
		});
	}
}

module.exports = Modify;