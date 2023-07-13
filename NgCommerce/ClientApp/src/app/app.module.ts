import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './admin/products/products.component';
import { ProductCardComponent } from './home/product-card/product-card.component';
import { ProductImageDirective } from './shared/directives/product-image.directive';
import { registerLocaleData } from '@angular/common';
import  localeDe from '@angular/common/locales/de';
import { ProductComponent } from './pages/product/product.component'; 

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProductsComponent,
    ProductCardComponent,
    ProductImageDirective,
    ProductComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'products/:id', component: ProductComponent },
      { path: 'admin/products', component: ProductsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
