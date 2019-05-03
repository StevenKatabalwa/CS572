const fs = require('fs')
const http = require('http')
const url = require('url')
const env = require('dotenv')

env.config({ path: '../lab4/.env' })

const portNumber = process.env.PORT
const hostName = process.env.HOSTNAME


process.on('message', () => {

    let file = undefined

    http.createServer((req, res) => {

        const query = url.parse(req.url).path

        var [tag, file] = query.split("=")

        file = file || 'text.txt'

        fileExists(file, (result) => {

            if (result) {
                console.log('File exists')
            }
            else {
                console.log('File Not Exist')
                fs.writeFileSync(file, "This is the new file i have created", () => {
                    console.log(`File ${file} has been created`)
                })
            }

            file = fs.readFile(file, (err, data) => {

                res.write(data.toString())
                res.end()

                process.send(`Job has been completed by Processer: ${process.pid}`)

            })

            res.on('close', () => {
            
            })
        })

    }).listen(portNumber, hostName).on('listening', () => console.log('Server is listening'))

})

const fileExists = async (path, callback) => {
    await fs.exists(path, callback)
}