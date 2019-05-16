import { Directive, Input, Output, HostListener, OnInit, ElementRef, EventEmitter, HostBinding } from '@angular/core';

@Directive({
  selector: '[makeBigger]'
})
export class MakeBiggerDirective implements OnInit {
  
  @Input() makeBigger: number
  @HostBinding('style.color') fontColor
  @HostBinding('style.fontSize') fontSize
  arr:number

  constructor(public ef: ElementRef) 
  { 

  }

  ngOnInit(): void {
    console.log(`Made Bigger by ${this.makeBigger}`)
    console.log(this.ef)
  }

  @HostListener('dblclick') function(){
    console.log(this.ef.nativeElement)
    this.fontSize=this.fontSize || 0
    this.arr=parseInt(this.fontSize.toString().match("^[0-9]")[0])
    this.fontSize=`${<number>(this.arr)+this.makeBigger}em`
  }


}
