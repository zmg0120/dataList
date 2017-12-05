const carp = require("../lib/carp");
// const getData = require("../getData");
const getData = require("../getFromMongo");
const swig = require("swig");
const removeId = require("../removeFromMongo");


class All extends carp.Controller {
	get() {
		const filename = "./all.html";
		getData(function(data) {
			const tpl = swig.compileFile(filename);
			const resData = tpl({data: data});
			this.setHtml(resData);
			this.endHtml();
		}.bind(this));
	}
	delete() {
		let body = "";
		this.req.setEncoding("utf8");
		this.req.on("data", (chunk) => {
			body += chunk;
		});
		this.req.on("end", () => {
			let id;
			try {
				let reqData = JSON.parse(body);
				id = reqData.id;
				
			} catch(e) {
				console.log("Error body:",body);
				return this.event.emit("error", "400", this.res);
			}
			console.log("id :::",id);
			removeId(id, function(removed) {
				if (removed) {
					this.setHtml("true");
					this.endHtml();
				} else {
					this.event.emit("error", "500", this.res);
				}
			}.bind(this));
			
		});	
	}
}
module.exports = All;  