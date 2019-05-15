import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core'
import { template } from '@angular/core/src/render3';
import { increaseElementDepthCount } from '@angular/core/src/render3/state';

@Component({
    selector: 'counter',
    template: '<input type="Number" [value]="count" #inp (input)="change()"/>' +
        '<input type="button" (click)="decrease()" value="-"/>' +
        '<span> {{counterValue}} </span>' +
        '<input type="button"(click)="increase()" value="+"/>' +
        '<p>{{componentCounterValue}}</p>'
})
export class CounterComponent implements OnInit {

    @Input() counter
    componentCounterValue
   
    counterValue = 0

    ngOnInit() {

        this.counterValue = this.counter || this.counterValue
    }

    @ViewChild('inp') inp

    @Output() counterChange = new EventEmitter

    change() {

        this.counterChange.emit({event:this,data:`${this.inp.nativeElement.value}`})
    }

    increase() {
        this.counterValue++;
    }

    decrease() {

        if (this.counterValue > 0) {
            this.counterValue--;
        }
    }
}