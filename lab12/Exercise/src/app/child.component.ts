import { Component, Input } from '@angular/core'

@Component({
    selector: 'child',
    template: '<p *ngIf="([value]>[max]); else other" #me> This is my child compo:{{value}}</p>'+
    '<ng-template #other><p *ngFor="let name of names; let i=index">{{i}}</p></ng-template>'
})
export class ChildComponent {

    @Input('max') max
    @Input('val') value:any = 'Hello World'
    @Input() names:Array<String>=["Steven","Daniel"]
}