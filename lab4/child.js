const fs = require('fs')

process.on('message', (path) => {

    let file=undefined

    fileExists(path, (result) => {

        if (result) {
            console.log('File exists')          
        }
        else {
            console.log('File Not Exist')         
            fs.writeFileSync(path,"This is the new file i have created",()=>{
                console.log(`File ${path} has been created`)
            })
        }

        file=fs.readFile(path,(err,data)=>{
                process.send(data.toString())
                process.exit()
        })
    })

})

const fileExists = async (path, callback) => {
    await fs.exists(path, callback)
}