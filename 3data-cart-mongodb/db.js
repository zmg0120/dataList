const mongodb = require("mongodb");

const url = "mongodb://localhost:27017/person";

const getDB = function(cb) {
	mongodb.MongoClient.connect(url, (err, db) => {
		if (err) {
			throw err;
		}
		cb(db);
	});
}

module.exports = getDB;