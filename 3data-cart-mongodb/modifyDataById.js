const getDB = require("./db");
const ObjectID = require("mongodb").ObjectID;
// const mongodb = require("mongodb");
// const url = "mongodb://localhost:27017/person";

const modifyDataById = function(needModify, cb) {
	getDB((db) => {
		const col = db.collection("users");
		const query = {_id: new ObjectID(needModify.id)};
		delete needModify.id;
		const set = needModify;

		col.update(query, set, (err, res) => {
			if (err) {
				console.log("Error :", err);
				db.close();
				return cb(err);
			}
			console.log("Result ", res.result);
			cb(null);
			db.close();
		});	
	});
}

module.exports = modifyDataById;