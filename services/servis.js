const { getDb } = require('../configs/BD');




module.exports = {
    findToArray: (trajectory) => {
        let db = getDb();
        let char = db.collection(trajectory).find({}, { projection: { _id: 1, name_Model: 1 } }).toArray();
        return char;
    },


    findOne: (id, trajectory) => {
        let db = getDb();
        let char = db.collection(trajectory).findOne(id);
        return char;
    },

    insertOne: (query, trajectory) => {
        let db = getDb();
        let char = db.collection(trajectory).insertOne(query);
        return char;
    },

    deleteOne: (query, trajectory) => { 
        let db = getDb(); 
        let char = db.collection(trajectory).deleteOne(query); 
        return char; 
    },

    deleteMany: (query, trajectory) => {
        let db = getDb(); 
        let char = db.collection(trajectory).deleteMany(query); 
        return char; 
    },

    updateOne:(filter,update, trajectory ) => {
        let db = getDb(); 
        let char = db.collection(trajectory).updateOne(filter, update); 
        return char; 
    }

}


