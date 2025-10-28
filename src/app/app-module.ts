import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProductList } from './components/product-list/product-list';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenu } from './components/product-category-menu/product-category-menu';
import { Search } from './components/search/search';
import { ProductDetails } from './components/product-details/product-details';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatus } from './components/cart-status/cart-status';
import { CartDetails } from './components/cart-details/cart-details';
// import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {path: 'cart-details', component: CartDetails},
  {path: 'products/:id', component: ProductDetails},
  { path: 'search/:keyword', component: ProductList },
  { path: 'category/:id/:name', component: ProductList },
  { path: 'category', component: ProductList },
  { path: 'products', component: ProductList },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' }
]
@NgModule({
  declarations: [
    App,
    ProductList,
    ProductCategoryMenu,
    Search,
    ProductDetails,
    CartStatus,
    CartDetails
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    // HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    ProductService
  ],
  bootstrap: [App]
})
export class AppModule { }
