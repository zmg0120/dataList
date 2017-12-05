const carp = require("../lib/carp");
const getData = require("../getData");
const swig = require("swig");

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
}

module.exports = All;  