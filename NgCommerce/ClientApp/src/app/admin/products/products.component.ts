import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Product } from '../../core/Product';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/core/services/products.service';
import { NewProduct } from 'src/app/core/NewProduct';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: Product[] = [];
  public newProductFormAvailable: boolean = false;
  public responseErrorMessage = '';
  public faPencil = faPencil;
  public faTrash = faTrash;

  newProductForm = this.formBuilder.group<NewProduct>({
    name: '',
    price: 0,
    coverImageUrl: '',
    description: '',
    category: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService) {
  }

  async ngOnInit(): Promise<void> {
    this.newProductFormAvailable = false;
    this.productsService.getProducts()
      .then(products => {
        this.products = products
      })
      .catch(e => {
        console.error(e)
      })
      .finally(() => {
        this.newProductFormAvailable = true
      });
  }

  public OnSubmit(): void {
    this.newProductFormAvailable = false;
    this.responseErrorMessage = '';

    this.productsService.createProduct(<NewProduct>this.newProductForm.value)
      .then(p => {
        this.products.push(p);
      })
      .catch(e => {
        this.responseErrorMessage = e?.error ?? "Oops, something happened.";
      })
      .finally(() => {
        return this.newProductFormAvailable = true;
      });
  }
}

