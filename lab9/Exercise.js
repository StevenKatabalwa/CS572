const mongodb = require('mongodb')
const env = require('dotenv')
const express = require('express')
const Logger = require('../logger')
const url = require('url')

env.config()

const userName = process.env.USERNAME
const password = process.env.PASSWORD
const hostName = process.env.HOSTNAME
const mongoURL = process.env.mongoURL
const port = process.env.PORT

const { MongoClient } = mongodb
const router = express.Router()
const app = express()
const logger = new Logger()
const jsonParser = express.json()

const uri = mongoURL.replace('{0}', `${userName.toLowerCase()}:${encodeURIComponent(password)}`)

const mongoClient = new MongoClient(uri, { useNewUrlParser: true })

let db = null
let collection

//MiddleWare
app.use('/', (req, res, next) => {

    if (db == null) {

        mongoClient.connect().then(client => {

            db = client.db('mwa')
            collection = db.collection('zips')
            collection.createIndex({ country: 1, author: 1 })
            logger.log("DataBase Connection:Successful")

            next()

        }).catch(console.log)
    }

    else {

        collection = db.collection('zips')
        next()
    }

})

app.use('/zips', router)

app.listen(port, hostName).on('listening', () => logger.log('Server is listening'))

router.post('/zip', jsonParser, (req, res, next) => {

    const data = req.body
    collection.exists
    collection.insertOne(data).then(() => logger.log('Data has been added to the DB')).catch((err) => {
        const { '_id': id } = data
        collection.updateOne({ _id: id }, { $set: data }).then(() => logger.log('Data has been updated'))
        next('Duplicate Data detected')
    })

    res.send('Successful')

}).get('/', (req, res, next) => {
    collection
        .aggregate([
            { $group: { _id: { state: '$state', city: '$city' }, pop: { $sum: '$pop' } } },
            { $sort: { '_id.state': 1, pop: 1 } },
            { $group: { _id: '$_id.state', city: { $first: '$_id.city' }, pop: { $first: '$pop' } } },
            //{ $project: { 'state':'$_id.state', '_id.city': 1, pop: 1, } }
            { $project: { 'state':'$_id', city: 1, pop: 1, _id:0 } }           
        ]).toArray().then(docs => res.json(docs))

}).post('/search', (req, res, next) => {

    const reqURL = url.parse(req.url, true)

    const { q } = reqURL.query

    // collection.find({ lecture: { $in: [{ name: q }] } }).toArray().then(docs => res.json(docs))

}).put('/zip', jsonParser, (req, res, next) => {

    const { '_id': id, author } = req.body

    console.log(author.lastName)

    collection.stats().then(console.log)

    //collection.updateOne({'_id':id}).then(res.send('Data has been updated'))

    res.send('Done')

})
