const getDB = require("./db");
// const mongodb = require("mongodb");
// const url = "mongodb://localhost:27017/person";

const saveData = function(needWrite, cb) {
	getDB((db) => {
		const col = db.collection("users");
		col.insert(needWrite, (err, data) => {
			if (err) {
				console.log("Error :", err);
				db.close();
				return cb(err);
			}
			console.log("Result ", data.result);
			cb(null);
			db.close();
		});
	});
}

module.exports = saveData;