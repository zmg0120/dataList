const carp = require("../lib/carp");
const fs = require("fs");
const saveData = require("../saveData"); 

class AddPost extends carp.Controller {
	get() {
		const filename = "./post.html";
		fs.readFile(filename, (err, data) => {
			if (err) {
				return this.event.emit("error", "500", this.res);
			}
			this.setHtml(data);
			this.endHtml();
		});
	}
	post() {
		let body = ""
		this.req.setEncoding("utf8");
		this.req.on("data", (chunk) => {
			body += chunk;
		});
		this.req.on("end", () => {
			const postJson = JSON.parse(body);
			saveData(postJson, (err) => {
				if (err) {
					return this.event.emit("error", "500", this.res);
				}
				this.setHtml("true");
				this.endHtml();
			});
		});
	}
}

module.exports = AddPost;