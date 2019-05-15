import { Component, Output, ViewChild, ContentChild, Input } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab 11';
  
  changeCounter(x) {
    
  }
}
