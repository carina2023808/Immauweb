import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForOf } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-louer',
  standalone: true,
  imports: [HttpClientModule, NgForOf, RouterLink],
  templateUrl: './louer.component.html',
  styleUrl: './louer.component.css'
})
export class LouerComponent implements OnInit {
  properties: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://localhost:8000/api/properties?type=louer')
      .subscribe(data => {
        this.properties = data.data.map((property: any) => ({
          ...property,
          images: property.photos ?? []
        }));
      });
  }
}
