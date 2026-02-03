import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsResponse } from '@/products/interfaces/product.interface';
import { ProductsService } from '@/products/services/products.service';
import { Component, inject, resource, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [ ProductCard ],
  templateUrl: './home-page.html',
})
export class HomePage { 
  productService = inject(ProductsService);

  productsResource = rxResource({
    request: () => ({}), // Si en el futuro quisieras recargar los productos cuando cambie algún filtro o parámetro, ahí sí usarías request con valores reales.
    loader: ({request}) => {
      return this.productService.getProducts(request)
    }
  })
}
