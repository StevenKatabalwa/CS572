const mongodb = require('mongodb')
var encryptor = require('simple-encryptor');

const { MongoClient } = mongodb

const client = new MongoClient('mongodb://homework01:homework01@ds233806.mlab.com:33806/homework01', { useNewUrlParser: true })
client.connect().then(() => {

    console.log('Connected')
    const db = client.db('homework01')
    const collection = db.collection('data')
    collection.findOne({}, { projection: { key: 1, message: 1, _id: 0 } })
        .then(doc => {
            const x = { message: encryptor(doc.key).decrypt(doc.message) }
            return x
        }).then(console.log)


})
