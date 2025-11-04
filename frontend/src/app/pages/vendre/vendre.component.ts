import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-vendre',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterLink],
  templateUrl: './vendre.component.html',
  styleUrls: ['./vendre.component.css']
})
export class VendreComponent implements OnInit {
  properties: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://localhost:8000/api/properties?type=vendre')
      .subscribe(data => {
        this.properties = data.data.map((property: any) => ({
          ...property,
          images: property.photos ?? []
        }));
      });
  }
}
