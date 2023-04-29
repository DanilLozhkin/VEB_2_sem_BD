const { getDb } = require('../configs/BD');
const { ObjectId } = require('mongodb');



module.exports = {
    findToArray:  () => { 
        let db =  getDb(); 
        let char =  db.collection('VEB_2').find().toArray(); 
        return char; 
    },
    

    findOne:  (id) => {
        let db =  getDb();
        let char =  db.collection('VEB_2').findOne({_id: new ObjectId(id)});
        return char;
      },
      
    insertOne: (query) => {
        let db = getDb();
        let char = db.collection('VEB_2').insertOne(query);
        return char;
    }
}


