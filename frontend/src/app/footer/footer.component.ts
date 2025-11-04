import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  address = 'Adress';
  phone = '012437587';
  logoLetter = '@';
  // companyName = 'Limited All RightsReserved';

  socialLinks = {
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/?locale=be',
    twitter: '#'
  };
}
