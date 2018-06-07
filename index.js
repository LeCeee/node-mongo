const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url).then((client) => {
    const db = client.db('conFusion');
    console.log('connected correctly to the server');

    dboper.insertDocument(db,{"name":"taco","description":"izzaa taco"},'dishes')
    .then((result) => {
        console.log('insert document ',result.ops);
        return dboper.findDocuments(db,"dishes");
    })
    .then((docs) =>{
        console.log("found documents: \n",docs);
        return dboper.updateDocument(db,{"name": "taco"},{"description":"updated description"},"dishes");
    })
    .then((result) => {
        console.log('updated Document:\n', result.result);
        return dboper.findDocuments(db,"dishes");
    })
    .then((docs) => {
        console.log('Found updated documents:\n',docs);
        return db.dropCollection("dishes");
    })
    .then((result) => {
        console.log("dropped collection",result);
        return client.close();

    })
    .catch((err) => console.log(err));

})
.catch((err) => console.log(err)) ;
