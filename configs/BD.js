const { MongoClient } = require('mongodb');

let dbConnection;


module.exports = {
    connectToDB: (cb) => {
        MongoClient.connect(`mongodb://127.0.0.1:27017/VEB_2`)
            .then((client) => {
                console.log('Connect to BD');
                dbConnection = client.db();
                return cb();
            })
            .catch((err) => {
                console.log('error BD');
                return cb(err);
            })
    },
    getDb: () => dbConnection,

}