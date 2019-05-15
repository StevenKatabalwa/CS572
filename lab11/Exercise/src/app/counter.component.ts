import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core'

@Component({
    selector: 'counter',
    template: '<input type="Number" [value]="count" #inp (input)="change()"/>' +
        '<input type="button" (click)="decrease()" value="-"/>' +
        '<span> {{counterValue}} </span>' +
        '<input type="button"(click)="increase()" value="+"/>' +
        '<p>Component Counter Value: {{componentCounterValue}}</p>'
})
export class CounterComponent implements OnInit {

    @Input() counter
    @Output() counterChange = new EventEmitter
    @ViewChild('inp') inp

    componentCounterValue
    counterValue = 0

    ngOnInit() {

        this.counterValue = this.counter || this.counterValue
    }

    change() {

        const caller = this.inp.nativeElement        
        
        this.counterChange.emit(`${caller.value}`)
        this.componentCounterValue = caller.value
        this.counterValue=caller.value||0
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