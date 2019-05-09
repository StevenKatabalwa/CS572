const mongodb = require('mongodb')
const env = require('dotenv')
const util = require('util')
const fs = require('fs')
const rxjs = require('rxjs')
const operators = require('rxjs/operators')

env.config()

const { MongoClient } = mongodb
const { from, of } = rxjs
const { map, toArray, flatMap } = operators
const userName = process.env.USERNAME
const password = process.env.PASSWORD
const jsonDataPath = process.env.JSONDATAPATH
const mongoURL = process.env.MONGOURL

let db = null

const connectionString = mongoURL.replace('{0}', `${userName.toLowerCase()}:${encodeURIComponent(password)}`)
console.log(connectionString)

const client = new MongoClient(connectionString, { useNewUrlParser: true })

const middleware = (req, res, next) => {

    if (db == null) {

        client.connect()
            .then(client => {
                db = client.db('mwa')
                return db.collection('restaurants')
            }).then(col => {

                col.countDocuments().then(x => {

                    if (x <= 0) {

                        readBooks(jsonDataPath).then(data => {

                            // from(JSON.parse(data)).pipe(

                            //     map(data => {

                            //         const { '_id': id, author, country, imageLink, language, link, pages, title, year } = data

                            //         const reviews = generateRandom(1, 10, 5)
                            //         const [firstName,lastName]=author.split(" ")

                            //         return { '_id': id, 'author': {firstName,lastName}, 'country': country, 'imageLink': imageLink, 'language': language, 'link': link, 'pages': pages, 'title': title, 'year': year, 'reviews': reviews }
                            //     }),
                            //     toArray()
                            // ).subscribe((data) => {

                                //const jsonData = JSON.parse(data)

                                //col.insertMany(data)

                            //})

                            from(data.toString().split('\n')).pipe(
                            
                                    flatMap(data=>data.split("\n")),
                                    toArray()
                                    
                                ).subscribe(data=>{

                                    fs.writeFile('output.json',data,(err)=>{})
                                   // col.insertMany()

                                })

                            

                        })

                        console.log('New Books have been added')
                    }
                })

            }).catch(console.log)

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

const generateRandom = (min, max, size) => {

    let arr = [size]

    for (let x = 0; x < size; x++) {

        arr[x] = Math.floor(Math.random() * (max - min)) + min;
    }

    return arr
}

module.exports = middleware

