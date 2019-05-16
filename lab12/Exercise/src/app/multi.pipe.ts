import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'multi'
})
export class MultiPipe implements PipeTransform {

    transform(value: String, args?: any) {

        let multiple:String = value

        let i = 1
        while (i < 3) {

            value += ` ${multiple}`

            i++
        }
        return value

    }
}