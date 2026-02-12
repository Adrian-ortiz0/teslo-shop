import { Component, inject, signal } from '@angular/core';
import { ProductTable } from "@/products/components/product-table/product-table";
import { ProductsService } from '@/products/services/products.service';
import { PaginationServiceService } from '@/shared/components/pagination/pagination.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from "@/shared/components/pagination/pagination";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, Pagination],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {

  productService = inject(ProductsService);
  paginationService = inject(PaginationServiceService);
  productsPerPage = signal(10);

  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage() - 1,
      limit: this.productsPerPage()
    }), // Si en el futuro quisieras recargar los productos cuando cambie algún filtro o parámetro, ahí sí usarías request con valores reales.
    loader: ({ request }) => {
      return this.productService.getProducts({
        offset: request.page * 9,
        limit: request.limit
      });
    },
  });
 }
