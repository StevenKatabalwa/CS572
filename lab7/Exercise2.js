const mongodb = require('mongodb')
var encryptor = require('simple-encryptor');


const { MongoClient } = mongodb

const client = new MongoClient('mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01', { useNewUrlParser: true })
client.connect().then(() => {

    console.log('Connected')
    const db = client.db('homework01')
    const collection = db.collection('data')
    collection.findOne({},{message:1}).then(console.log)
    
})
