const childProcess = require('child_process')
const http = require('http')
const url = require('url')
const env = require('dotenv')

const {fork}=childProcess

env.config({ path: '../lab4/.env' })

const portNumber = process.env.PORT
const hostName = process.env.HOSTNAME

http.createServer((req, res) => {

    const query = url.parse(req.url).path

    var [tag, file] = query.split("=")

    file= file || 'text.txt'

    const child = fork('./child.js')

    child.send(file)

    child.on('message', (data) => {
        res.write(data)
   
    }).on('exit',()=>{     
        res.end()
        console.log('Child has finished sending data')
    
    })

}).listen(portNumber, hostName).on('listening', () => console.log('Server is listening'))