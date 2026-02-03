import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import 'swiper/css';
import Swiper from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Navigation, Pagination} from 'swiper/modules';
import { ProductImagePipe } from '@/products/pipes/product-image.pipe';

@Component({
  selector: 'app-product-carousel',
  imports: [ProductImagePipe],
  templateUrl: './product-carousel.html',
  styles: `
    .swiper {
      width: 100%;
      height: 500px;
    }
  `,
})
export class ProductCarousel implements AfterViewInit {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv'); // seleccionar un elemento del html con referencia local #swiperDiv

  ngAfterViewInit(): void {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    const swiper = new Swiper(element, {
      direction: 'horizontal',
      loop: true,
      modules:[
        Navigation,
        Pagination
      ],

      pagination: {
        el: '.swiper-pagination',
      },

      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
