import {Directive, Input, OnChanges, SimpleChanges, SimpleChange} from '@angular/core'
import { NgForOf } from '@angular/common';



@Directive({
    selector:'[ngFor][arr]'
})
export class NgForIn<T> extends NgForOf<T> implements OnChanges{
   
    @Input() arr:any
   
    ngOnChanges(changes: SimpleChanges): void {
    
      //  this.ngForOf=Object.keys(this.arr) as Array<any>
        console.log("Hello")
        console.log(this.ngForOf)
    }
}