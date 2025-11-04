import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  property: any;
  isLoading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchProperty(id);
    } else {
      this.error = 'ID do imóvel não encontrado na URL.';
      this.isLoading = false;
    }
  }

  fetchProperty(id: string) {
    this.http.get(`https://localhost:8000/api/properties/${id}`).subscribe({
      next: (data) => {
        this.property = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'Erro ao carregar detalhes do imóvel.';
        this.isLoading = false;
      }
    });
  }



// carrossel
currentIndex = 0;

nextImage() {
  if (!this.property?.photos) return;
  this.currentIndex = (this.currentIndex + 1) % this.property.photos.length;
}

prevImage() {
  if (!this.property?.photos) return;
  this.currentIndex =
    (this.currentIndex - 1 + this.property.photos.length) % this.property.photos.length;
}

goToImage(index: number) {
  this.currentIndex = index;
}


}
