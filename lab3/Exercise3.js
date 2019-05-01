const fs = require('fs')
const http = require('http')

const filePath = './Resources/comedy.mp4'

//using fileSync
http.createServer((req, res) => {

    const fileSyncData = fs.readFileSync(filePath)

    console.log(fileSyncData)

    res.writeHead(200, { 'Content-Type': 'video/mp4' })

    res.write(fileSyncData)
    res.end()

}).listen(8081, 'localhost').on('listening', () => {

    console.log("Server is listening")

})

//using fileRead
http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'video/mp4' })

    fs.readFile(filePath, (err, data) => {
        console.log(data)
        res.write(data)
        res.end()
    })

}).listen(8082, 'localhost').on('listening', () => {

    console.log("Asynchronous FileRead Server is listening")

})

//using streams
http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'video/mp4' })

    const fileStreamData = fs.createReadStream(filePath,{highWaterMark:655360})
    
    fileStreamData.on('data',(data) => {
        console.log(data)
        res.write(data)
    })

}).listen(8083, 'localhost').on('listening', () => {

    console.log("File Stream Server is listening")
})
