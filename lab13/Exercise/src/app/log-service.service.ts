import { Injectable } from '@angular/core';
import { EventEmitter } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  com=new EventEmitter()

  send(message){
    this.com.emit(message)
  }

}
