import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public products: Product[] = [];
  public newProductFormAvailable: boolean = false;
  public responseErrorMessage = '';
  newProductForm = this.formBuilder.group({
    name: '',
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
      .subscribe(
        result => { this.products = result; },
        error => console.error(error));
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
      .subscribe(
        result => { this.products.push(result); },
        error => {
          this.responseErrorMessage = error?.error ?? "Oops, something happened." ;
        });
  }
}

interface Product {
  id: number,
  name: string,
  description: string;
  category: string;
}
