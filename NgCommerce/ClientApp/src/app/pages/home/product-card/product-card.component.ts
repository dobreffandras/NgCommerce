import { Component, Inject, Input } from '@angular/core';
import { Product } from 'src/app/core/Product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() public product: Product | undefined;
}
