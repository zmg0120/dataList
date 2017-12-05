const getDB = require("./db");
const ObjectID = require("mongodb").ObjectID;

const removeId = function(id, cb) {
	const objId = new ObjectID(id);
	getDB(function(db) {
		const col = db.collection("users");
		col.remove({_id: objId}).then((res) => {
			console.log("Res: ",res.result);
			cb(true);
		}).catch((e) => {
			console.log("Error :",e);
			cb(false);
		});
	});
}

module.exports = removeId;