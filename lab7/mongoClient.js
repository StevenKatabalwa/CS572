const mongodb = require('mongodb')
const env = require('dotenv')
const util = require('util')
const fs = require('fs')

env.config()

const { MongoClient } = mongodb

const userName = process.env.USERNAME
const password = process.env.PASSWORD
const jsonDataPath = process.env.JSONDATAPATH

let db = null;

const connectionString = process.env.MONGOURL.replace('{0}', `${userName.toLowerCase()}:${encodeURIComponent(password)}`)

const client = new MongoClient(connectionString)

const middleware = (req, res, next) => {

    if (db == null) {

        client.connect()
            .then(() => {
                db = client.db('mwa')
                return db.collection('books')
            }).then(col => {

                col.countDocuments().then(x => {
                    
                    if (x <= 0) {

                        readBooks(jsonDataPath).then(data => {

                            const jsonData = JSON.parse(data)

                            col.insertMany(jsonData)
                        })

                        console.log('New Books have been added')
                    }
                })


            })

        console.log("Db connection: Successful")
    }
    else {
        
    }
}


const readBooks = (path) => {

    const read = util.promisify(fs.readFile)

    return read(path, (err, data) => {

        return data;

    })

}

module.exports = middleware

