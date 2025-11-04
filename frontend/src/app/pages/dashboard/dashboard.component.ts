import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';


declare var $: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  lastProperties: any[] = [];
  carouselInstance: any;
  searchTerm: string = '';
  properties: any[] = [];

  constructor(private http: HttpClient, private titleService: Title) {}
  pageTitle: string = '';




  ngOnInit(): void {

    this.pageTitle = this.titleService.getTitle();

    this.http.get<any>('https://localhost:8000/api/properties').subscribe(
      data => {

        this.lastProperties = data.data.map((property: any) => ({
          ...property,
          photos: property.photos ?? []
        }));

      },
      error => {
        console.error('Erro ao carregar propriedades:', error);
      }
    );
  }

  


//testimonial
ngAfterViewInit(): void {
     setTimeout(() => {
      if ($ && $('.owl-carousel').length) {
        $('.owl-carousel').owlCarousel({
          loop: true,
          margin: 10,
          nav: true,
          autoplay: true,
          autoplayTimeout: 3000,
          autoplayHoverPause: true,
          responsive: {
            0: { items: 1 },
            600: { items: 1 },
            1000: { items: 3 }
          }
        });

        console.log('✅ Owl Carousel inicializado com sucesso!');
      } else {
        console.warn('⚠️ Elemento .owl-carousel não encontrado no DOM.');
      }
    }, 500);
  }
}










