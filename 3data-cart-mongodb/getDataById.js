const getDB = require("./db");
const ObjectId = require("mongodb").ObjectId;


const getDataById = function(id, cb) {
	getDB((db) => {
		const col = db.collection("users");
		const query = {_id: new ObjectId(id)};
		col.findOne(query, (err, data) => {
			if (err) {
				console.log(err);
				cb(null);
				db.close();
			}
			cb(data)
			db.close();
		});
	});
}

module.exports = getDataById;
