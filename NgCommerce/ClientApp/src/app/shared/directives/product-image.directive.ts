import { Directive, ElementRef, Input } from '@angular/core';
import { Product } from 'src/app/core/Product';

@Directive({
  selector: '[productImage]'
})
export class ProductImageDirective {
  constructor(private element : ElementRef) {}
  
  @Input() set productImage(imageUrl: string | undefined){
    let el = this.element.nativeElement as HTMLElement;
    if(imageUrl){
      el.style.backgroundImage = `url(${imageUrl})`;
    } else {
      el.classList.add("empty-cover-image");
    }
  }
}
