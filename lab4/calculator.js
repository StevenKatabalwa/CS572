
process.on('message', (arr) => {

    console.log('Message Received')
   
})

setInterval(()=>{
    process.send('Hello World')
},1000)