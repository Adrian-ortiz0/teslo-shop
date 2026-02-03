import { ProductsService } from '@/products/services/products.service';
import { Component, inject, input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.html',
})
export class ProductPage { 

  productService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

  productIdSlug = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    request: () => ({idSlug: this.productIdSlug}),
    loader: ({request}) => {
      return this.productService.getProductByIdSlug(request.idSlug);
    }
  })
}
