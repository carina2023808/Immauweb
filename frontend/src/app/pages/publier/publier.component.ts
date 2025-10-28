import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-publier',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],

  templateUrl: './publier.component.html',
  styleUrls: ['./publier.component.css'],
})
export class PublierComponent {
  title: string = '';
  propertyType: string = '';
  listingType: string = '';
  description: string = '';
  address: string = '';
  city: string = '';
  country: string = '';
  postCode: string = '';
  totalArea!: number;
  price!: number;

  selectedImages: string[] = [];
  selectedFiles: File[] = [];

  constructor(private http: HttpClient, private router: Router) {}


  onFilesSelected(event: Event): void {
    this.selectedImages = [];
    this.selectedFiles = [];

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        let file = input.files[i];
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => this.selectedImages.push(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('propertyType', this.propertyType);
    formData.append('listingType', this.listingType);
    formData.append('description', this.description);
    formData.append('address', this.address);
     formData.append('city', this.city);
    formData.append('country', this.country);
    formData.append('postCode', this.postCode);
    formData.append('totalArea', this.totalArea.toString());
    formData.append('price', this.price.toString());

    const user = JSON.parse(localStorage.getItem('user') || "{}");
    formData.append('userId', user.id.toString());

    this.selectedFiles.forEach((file) => {
      formData.append('images[]', file, file.name);
    });

    this.http
      .post('https://localhost:8000/api/properties', formData)
      .subscribe({
        next: (res) => {
          this.router.navigate(['/profil']);
        },
        error: (err) => console.error('erro le annouce nest pas ete publie', err),
      });
  }
}
