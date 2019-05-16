import { Component, Input, ViewChild, ElementRef, ContentChild, AfterViewInit, OnChanges } from '@angular/core'

@Component({
    selector: 'smart',
    template: '<dumb #d [isVisible]=true [makeBigger]=4 (click)="clickMe()"></dumb>'
})
export class SmartComponent implements OnChanges {

    @Input('data') data
    @ViewChild('d') dumb
    
    clickMe() {
       // console.log(this.dumb.size)
    }

    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
        this.data = this.data.split(",")
        this.dumb.names = this.data
        //console.log(this.dumb)
    }
}