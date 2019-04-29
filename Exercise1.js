
//using ES6
const sentence="Hello world , this is an example of a banned statement"
const bannedWords=["world","banned"]

const result=sentence.split(" ").filter(st => !bannedWords.includes(st)).reduce((first,last)=>`${first} ${last}`)

console.log(result)