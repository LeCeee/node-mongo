const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

MongoClient.connect(url,(err, client) => {
    assert.equal(err,null);
    console.log('connected correctly to the server');
    const db = client.db('conFusion');
    const collection = db.collection("dishes");
    collection.insertOne({"name":"peesha","description":"izz yumm"},
    (err,result) => {
        assert.equal(err,null);
        console.log('after insert');
        console.log(result.ops);

        collection.find({}).toArray((err,docs) => {
            assert.equal(err,null);

            console.log('found:\n');
            console.log(docs);

            db.dropCollection('dishes',(err,result) => {
                assert.equal(err,null);
                client.close();
            });
        });
    });
});

