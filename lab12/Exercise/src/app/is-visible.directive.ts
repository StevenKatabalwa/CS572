import { Directive, Input, ElementRef, OnInit, OnChanges } from '@angular/core';

@Directive({
  selector: '[isVisible]',
})
export class IsVisibleDirective implements OnChanges {
 
  @Input() isVisible: boolean
  
  constructor(public ef: ElementRef) {

  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    
      this.ef.nativeElement.hidden=!this.isVisible
  }

}
