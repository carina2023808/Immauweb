import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-louer',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './louer.component.html',
  styleUrl: './louer.component.css'
})
export class LouerComponent implements OnInit {
  properties: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8000/api/properties')
      .subscribe(data => {
        this.properties = data.map(property => ({
          ...property,
          images: property.images ?? []
        }));
      });
  }
}
