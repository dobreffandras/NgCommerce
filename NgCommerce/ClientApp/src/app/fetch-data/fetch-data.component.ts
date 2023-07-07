import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public products: Product[] = [];

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
      .subscribe(
        result => { this.products = result; },
        error => console.error(error));
  }

  public OnSubmit(): void {
    console.log(this.newProductForm.value)
    this.http.post<Product>(
      this.baseUrl + 'api/products',
      this.newProductForm.value)
      .subscribe(
        result => { this.products.push(result); },
        error => console.error(error));
  }
}

interface Product {
  id: number,
  name: string,
  description: string;
  category: string;
}
