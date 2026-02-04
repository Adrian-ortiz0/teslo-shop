import { ProductCard } from '@/products/components/product-card/product-card';
import { ProductsService } from '@/products/services/products.service';
import { Component, inject} from '@angular/core';
import { rxResource, toSignal} from '@angular/core/rxjs-interop';
import { Pagination } from '@/shared/components/pagination/pagination';
import { PaginationServiceService } from '@/shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [ProductCard, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  productService = inject(ProductsService);
  paginationService = inject(PaginationServiceService);

  productsResource = rxResource({
    request: () => ({page: this.paginationService.currentPage() - 1}), // Si en el futuro quisieras recargar los productos cuando cambie algún filtro o parámetro, ahí sí usarías request con valores reales.
    loader: ({ request }) => {
      return this.productService.getProducts({
        offset: request.page * 9
      });
    },
  });
}
