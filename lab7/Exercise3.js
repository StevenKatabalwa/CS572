const mongodb = require('mongodb')
const env = require('dotenv')
const express = require('express')
const Logger = require('./logger')
const url=require('url')

env.config()

const userName = process.env.USERNAME
const password = process.env.PASSWORD
const hostName = process.env.HOSTNAME
const port = process.env.PORT

const { MongoClient } = mongodb
const router = express.Router()
const app = express()
const logger = new Logger()
const jsonParser = express.json()

const uri = `mongodb+srv://${userName.toLowerCase()}:${encodeURIComponent(password)}@cluster0-ryudk.azure.mongodb.net?retryWrites=true`

const mongoClient = new MongoClient(uri, { useNewUrlParser: true })

let db = null
let collection = null

//MiddleWare
app.use('/', (req, res, next) => {

    if (db == null) {

        mongoClient.connect().then(client => {

            db = client.db('homework07')
            collection = db.collection('lectures')
            logger.log("DataBase Connection:Successful")

            next()

        }).catch(console.log)
    }

    else {

        collection = db.collection('lectures')
        next()
    }

})

app.use('/lectures', router)

app.listen(port, hostName).on('listening', () => logger.log('Server is listening'))

router.post('/lecture', jsonParser, (req, res, next) => {

    const data = req.body
    collection.exists
    collection.insertOne(data).then(() => logger.log('Data has been added to the DB')).catch((err) => {
        const { '_id': id } = data
        collection.updateOne({ _id: id }, { $set: data }).then(() => logger.log('Data has been updated'))
        next('Duplicate Data detected')
    })

    res.send('Successful')

}).get('/', (req, res, next) => {
    
    collection.find().toArray().then(docs => res.json(docs))

}).post('/search',(req,res,next)=>{

    const reqURL=url.parse(req.url,true)

    const {q}=req.query

    collection.find({lecture:{$in:[{name:q}]}}).toArray().then(docs=>res.json(docs))

})
