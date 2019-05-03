const express = require('express')
const env = require('dotenv')
const axios = require('axios')
const url=require('url')

env.config({ path: './.env' })

const app = express()
const portNumber = process.env.PORT
const hostName = process.env.HOSTNAME

app.set('x-powered-by',false)
app.set('strict routing',true)
app.set('case sensitive routing',true)
//app.set('etag','weak')

app.get('/', (req, res) => {

    fetchData('https://randomuser.me/api/?results=10')
    .then((data)=>{

        console.log(data)

        const headers={
            'Content-Type':'application/json',
            'Cache-Control':'private, max-age=86400',
            'Last-Modified':'Fri, 03 May 2019 21:27:26 GMT',
            'Link':url.parse(req.url).href+' rel=next',
             etag:data.headers.etag
        }

        res.set(headers)
    
        const jsonData=JSON.stringify(data.data.results)

        console.log(jsonData)

        res.write(jsonData)

        res.end()
    })

}).listen(portNumber,hostName).on('listening', () => {

    console.log(`Server is listening at: ${hostName}:${portNumber}`)

})

//returns a promise constructed from a JSON
const fetchData = async (url) => {

    return await axios.get(url).then((response) => {
        return response
    })
}

/**Test**/



//path: https://randomuser.me/api/?results=10