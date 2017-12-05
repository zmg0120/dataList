const getDB = require("./db");
// const mongodb = require("mongodb");
// const url = "mongodb://localhost:27017/person";

const getData = function(cb) {
	getDB((db) => {
		const col = db.collection("users");
		const cursor = col.find();
		cursor.toArray((err, data) => {
			if (err) {
				console.log(err);
			} 
			cb(data)
			db.close();
		});
	});
}

module.exports = getData;

