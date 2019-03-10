import { Directive, OnInit, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
  
  constructor(private elementRef : ElementRef,private renderer : Renderer2) { }

  @HostBinding('class.open') isOpen : boolean = false;

  ngOnInit(): void {
    
  }
  
  @HostListener('click') mouseclick(){
    // this.renderer.setAttribute(this.elementRef.nativeElement,'class','btn-group open');
    this.isOpen = !this.isOpen;
  }

  @HostListener('mouseover') mouseover(){
    this.renderer.setAttribute(this.elementRef.nativeElement,'class','btn-group open');
  }
  
  @HostListener('mouseleave') mouseleave(){
    this.renderer.setAttribute(this.elementRef.nativeElement,'class','btn-group');
  }
}
