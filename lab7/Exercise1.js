const client = require('./mongoClient')
const env = require('dotenv')
const express = require('express')

env.config()

const hostName = process.env.HOSTNAME
const port = process.env.PORT

console.log(hostName+port)

const app = express()
const router = express.Router()

app.use('/', client)

router.get('/', (req, res, next) => {
})

app.listen(port, hostName)
    .on('listening', () => {
        console.log('Server is listening')
    })