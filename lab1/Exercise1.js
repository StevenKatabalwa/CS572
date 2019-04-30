const rxjs = require('rxjs')
const operators = require('rxjs/operators')

//using ES6
const sentence = "This house is nice !"
const bannedWords = ["house", "nice"]

const result = sentence.split(" ").map(st => !bannedWords.includes(st) ? st : '***').reduce((first, last) => `${first} ${last}`)

console.log(result)


/*----------------------------------------------------------------*/

//using Promises
String.prototype.filterWords = function (more) {

    return new Promise((resolve, reject) => {

        const words = this.toString().split(" ")
        const result = [words.length];
        let count = 0;

        words.forEach(w => {

            if (more.includes(w)) {

                result[count] = "***"

            }

            else {
                result[count] = w
            }

            count++;
        })

        resolve(result)
    }).then((v) => console.log(v.reduce((a, b) => `${a} ${b}`)))
}

sentence.filterWords(bannedWords)

/*----------------------------------------------------------------*/

//using Async/Await
String.prototype.filterWords = async function (banned) {

    const result = await this.toString().split(" ").map(w => !banned.includes(w) ? w : '***').reduce((first, last) => `${first} ${last}`)

    return result
}

sentence.filterWords(bannedWords).then(console.log)


/*----------------------------------------------------------------*/

//Using Observables
const { Observable } = rxjs
const { map, reduce, flatMap } = operators

String.prototype.filterWords = function (banned) {

    const words$ = Observable.create((observer) => {
        observer.next(this.toString())
        observer.complete()
    })

    words$.pipe(
        flatMap(x => x.split(" ")),
        map(w => !bannedWords.includes(w) ? w : '***'),
        reduce((first, last) => `${first} ${last}`)
    ).subscribe(console.log)
}

sentence.filterWords(bannedWords)
