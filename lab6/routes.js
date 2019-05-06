const express = require('express')
const url = require('url')
const fs = require('fs')
const env = require('dotenv')
const rxjs = require('rxjs')
const operators = require('rxjs/operators')

env.config({ path: './.env' })
const dataPath = process.env.DATAPATH

const router = express.Router()
const jsonParser = express.json()

const { from } = rxjs
const { map, filter, toArray } = operators

const responseHeaders = {
    'Content-Type': 'application/json'
}

router.get('/', (req, res, next) => {

    const requestUrl = url.parse(req.url, true)
    const { id } = requestUrl.query

    if (id) {

        return next()
    }

    else {

        readData(dataPath)
            .then((data) => {

                res.writeHead(200, responseHeaders)

                console.log('Data:'+data)

                res.write(data)

                res.end()

            }).catch((err)=>{

                res.write('Users do not exist')
    
                res.end()
    
            })
    }

},(req, res, next) => {

        const requestUrl = url.parse(req.url, true)
        const { id } = requestUrl.query

        readData(dataPath).then(data => {

            const jsonData = JSON.parse(data)

            from(jsonData).pipe(

                filter(usr => usr.id == id)

            ).subscribe(result => {

                res.json(result)

                res.end()

            })

        }).catch((err)=>{

            res.write('User does not exist')

            res.end()

        })

    }

).post('/', jsonParser, (req, res) => {

    const data = req.body

            readData(dataPath)
                .then(result => {

                    result = JSON.parse(result)

                    result.push(data)

                    return JSON.stringify(result)

                }).then(result => {

                    writeData(dataPath, result)

                    res.write('Data has been added to file')

                    res.end()
                })

        .catch((err) => {

            writeData(dataPath, JSON.stringify(data))

            res.write('Data has been written to file')

            res.end()
        })

}).put('/', jsonParser, (req, res, next) => {

        const requestQuery = url.parse(req.url, true)

        const { id } = requestQuery.query

        if (!id) return next('There is an error with your query string')

        else {

            readData(dataPath)
                .then(data => {

                    const jsonData = JSON.parse(data)

                    from(jsonData)
                        .pipe(

                            map(usr => {
                                if (usr.id == id) {
                                    const newUsr = req.body
                                    usr.name = newUsr.name
                                    usr.age = newUsr.age
                                }
                                return usr
                            }),
                            toArray()

                        ).subscribe(results => {

                            writeData(dataPath, JSON.stringify(results))

                            res.write("Data has been Updated")

                            res.end()

                        })
                }).catch((err)=>{

                    res.write('User does not exist')
        
                    res.end()
        
                })
        
        }

    }).delete('/', (req, res, next) => {

        const requestQuery = url.parse(req.url, true)

        const { id } = requestQuery.query

        if (!id) return next('There is an error with your query string')

        else {

            readData(dataPath)
                .then(data => {

                    from(JSON.parse(data))
                        .pipe(

                            filter(usr => usr.id != id),
                            toArray()

                        ).subscribe(results => {

                            writeData(dataPath, JSON.stringify(results))

                            res.send('User has been deleted')

                        })

                }).catch((err)=>{

                    res.write('User does not exist')
        
                    res.end()
        
                })
                
        }

    })

const readData = (path) => {

    return new Promise((res, rej) => {

        res(fs.readFileSync(path))

    })

}

const writeData = (path, data) => {

    fs.writeFile(path, data, (err) => {

        console.log('Data has been written to file')
    })

}

module.exports = router