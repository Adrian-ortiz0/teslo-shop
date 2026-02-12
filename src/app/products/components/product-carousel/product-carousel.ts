import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
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
export class ProductCarousel implements AfterViewInit, OnChanges {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv'); // seleccionar un elemento del html con referencia local #swiperDiv
  swiper: Swiper | undefined = undefined; 
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['images'].firstChange){
      return;
    }
    if(!this.swiper) return;
    this.swiper.destroy(true, true);

    const paginationEl: HTMLDivElement = this.swiperDiv().nativeElement?.querySelector('.swiper-pagination'); 

    paginationEl.innerHTML = '';

    setTimeout(() => {
       this.swiperInit();
    }, 100);

   

  }

  ngAfterViewInit(): void {
    this.swiperInit()
  }

  swiperInit(){
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    this.swiper = new Swiper(element, {
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
