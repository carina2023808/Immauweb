// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { NavbarComponent } from "./navbar/navbar.component";
// import { FooterComponent } from "./footer/footer.component";
// import { Title } from '@angular/platform-browser';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet, NavbarComponent, FooterComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   title = 'frontend';

//    constructor( private titleService: Title) {}
//   pageTitle: string = '';

//   ngOnInit(): void {

//     this.pageTitle = this.titleService.getTitle();
// }
// }


import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent]
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(data => {
      const title = data['title'] ? `${data['title']} - Immauweb` : 'Immauweb';
      this.titleService.setTitle(title);
    });
  }
}
