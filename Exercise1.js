
//using ES6
const sentence = "This house is nice !"
const bannedWords = ["house", "nice"]

const result = sentence.split(" ").map(st => !bannedWords.includes(st)?st:'***').reduce((first, last) => `${first} ${last}`)

console.log(result)


//using Promises
String.prototype.filterWords = function (more) {

    return new Promise((resolve, reject) => {

        const words = this.toString().split(" ")
        const result=[words.length];
        var count=0;

        words.forEach(w=>{

            if(more.includes(w)){

            result[count]="***"

            }

            else{
                result[count]=w
            }
            
            count++;
        })

        resolve(result.reduce((a,b)=>`${a} ${b}`))
    }).then((v)=>console.log(v))
}

sentence.filterWords(bannedWords)

//Using 