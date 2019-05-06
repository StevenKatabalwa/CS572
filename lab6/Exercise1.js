const express = require('express')
const env = require('dotenv')
const routes = require('./routes.js')
const fs = require('fs')
const logger=require('morgan')

env.config({ path: './.env' })
const app = express()

const portNumber = process.env.PORT
const hostName = process.env.HOSTNAME
const dataPath = process.env.DATAPATH

app.use('/users',logger('common'))

app.use('/users', (res, req, next) => {

    fileExists(dataPath)
        .then(console.log('Data Connection: Successful'))
        .catch(() => {
            fs.writeFile(dataPath, '', (err) => {

                console.log('File did not Exist, Created One')
            })
        })

    return next()
})

app.use('/users',routes)

app.listen(portNumber, hostName).on('listening', () => {

    console.log(`Server is listening at ${hostName}:${portNumber}`)
})


const fileExists = async (path) => {

    return new Promise((res, rej) => {

        const result = fs.existsSync(path)

        if (result) { res(result) }

        else { rej(result) }
    })

}
