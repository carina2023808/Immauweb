import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-vendre',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './vendre.component.html',
  styleUrls: ['./vendre.component.css']
})
export class VendreComponent implements OnInit {
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
