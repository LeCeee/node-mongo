const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url,(err, client) => {
    
    assert.equal(err,null);
    const db = client.db;
    console.log('connected correctly to the server');

    dboper.insertDocument(db,{"name":"taco","description":"izzaa taco"},'dishes',
    (result) => {
        console.log('insert document ',result.ops);
            dboper.findDocument(db,"dishes",(docs) =>{
                console.log("found documents: \n",docs);
                dboper.updateDocument(db,{"name": "taco"},{"dexcription":"updated description"},(result) => {
                    dboper.findDocument(db,"dishes",(docs) => {
                        console.log('Found updated documents:\n',docs);
                        db.dropCollection("dishes",(result) => {
                            console.log("dropped collection",result);
                            client.close();
                        });
                    });
                });
            });

    });
    
});

