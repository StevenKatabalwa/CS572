import { Component} from '@angular/core'

@Component({
    selector: 'dumb',
    template: '<p *ngFor="let name of names">{{name | multi}}</p>'
})
export class DumbComponent{
   
    names
   
}