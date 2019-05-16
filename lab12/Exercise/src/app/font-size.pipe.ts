import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fontSize'
})
export class FontSizePipe implements PipeTransform {

  arr:Array<any>

  transform(value: String, args?: any): any {
    
    this.arr=value.match("^//d")

    return this.arr
  }

}
