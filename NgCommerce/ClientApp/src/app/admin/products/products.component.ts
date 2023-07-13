import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs';
import { Product } from '../../core/Product';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public products: Product[] = [];
  public newProductFormAvailable: boolean = false;
  public responseErrorMessage = '';
  public faPencil = faPencil;
  public faTrash = faTrash;

  newProductForm = this.formBuilder.group({
    name: '',
    price: 0,
    coverImageUrl: '',
    description: '',
    category: '',
  });

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private formBuilder: FormBuilder) {

    http.get<Product[]>(baseUrl + 'api/products')
      .pipe(
        finalize(() => this.newProductFormAvailable = true)
      )
      .subscribe({
        next: p => { this.products = p; },
        error: e => console.error(e)
      });
  }

  public OnSubmit(): void {
    console.log(this.newProductForm.value)

    this.newProductFormAvailable = false;
    this.responseErrorMessage = '';

    this.http.post<Product>(
      this.baseUrl + 'api/products',
      this.newProductForm.value)
      .pipe(
        finalize(() => this.newProductFormAvailable = true)
      )
      .subscribe({
        next: p => {
          this.products.push(p);
        },
        error: e => { 
          this.responseErrorMessage = e?.error ?? "Oops, something happened.";
        }
      });
  }
}

