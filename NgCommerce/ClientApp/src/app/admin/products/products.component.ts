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
  public editedProductId: number | undefined;
  public newProductFormAvailable: boolean = false;
  public responseErrorMessage = '';
  public faPencil = faPencil;
  public faTrash = faTrash;

  get submitButtonText(): string {
    return this.editedProductId ? "Update" : "Create";
  }

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

    if (this.editedProductId) {
      let updatedProduct = <Product>{ id: this.editedProductId, ...this.newProductForm.value };

      this.productsService.updateProduct(updatedProduct)
        .then(p => {
          let index = this.products.findIndex(p => p.id == this.editedProductId);
          this.products[index] = updatedProduct;
          this.editedProductId = undefined;
          this.newProductForm.reset();
        })
        .catch(e => {
          this.responseErrorMessage = e?.error ?? "Oops, something happened.";
        })
        .finally(() => {
          return this.newProductFormAvailable = true;
        });
    } else {
      this.productsService.createProduct(<NewProduct>this.newProductForm.value)
        .then(p => {
          this.products.push(p);
          this.newProductForm.reset();
        })
        .catch(e => {
          this.responseErrorMessage = e?.error ?? "Oops, something happened.";
        })
        .finally(() => {
          return this.newProductFormAvailable = true;
        });
    }
  }

  public OnProductEdit(id: number) {
    let product = this.products.find(p => p.id === id)!;
    this.editedProductId = product.id;
    this.newProductForm.setValue({
      name: product.name,
      price: product.price,
      description: product.description,
      coverImageUrl: product.coverImageUrl,
      category: product.category
    });
  }
  
  public OnProductDelete(id: number) {
    let confirmed = confirm("Are you sure you want to delete product?");
    
    if(confirmed){
      this.productsService.deleteProduct(id)
      .then(() => {
        let index = this.products.findIndex(p => p.id == id);
        this.products.splice(index, 1);
        this.newProductForm.reset();
      })
      .catch(e => {
        this.responseErrorMessage = e?.error ?? "Oops, something happened.";
      });
    }
  }

  public OnCancel() {
    this.editedProductId = undefined;
    this.newProductForm.reset();
  }
}

