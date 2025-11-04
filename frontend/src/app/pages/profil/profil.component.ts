// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { UserService } from '../../services/user/user.service';
// import { PropertyService } from '../../services/property/property.service';
// import { AuthService } from '../../services/auth/auth.service';
// import { User } from '../../models/user';

// @Component({
//   selector: 'app-profil',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './profil.component.html',
//   styleUrls: ['./profil.component.css'],
// })
// export class ProfilComponent implements OnInit {
//   user: User | null = null;
//   loading = true;
//   editmode = false;
//   editpropertymode = false;


//   selectedImages: string[] = [];
//   selectedFiles: File[] = [];

//   constructor(
//     private router: Router,
//     private authService: AuthService,
//     private userService: UserService,
//     private propertyService: PropertyService
//   ) {}

//   ngOnInit(): void {
//     this.authService.currentUser().subscribe({
//       next: (data) => {
//         if (!data) {
//           this.loading = false;
//           return;
//         }

//         this.user = data;
//         this.loading = false;

//         this.userService.getUserWithProperties(data.id!).subscribe({
//           next: (data) => {
//             // Inicializa editMode para cada propriedade
//             this.user = data;
//             if (this.user && this.user.properties) {
//               this.user.properties = this.user.properties.map((p: any) => ({
//                 ...p,
//                 editMode: false,
//               }));
//             }
//             this.loading = false;
//           },
//           error: (err) => {
//             console.error('Erro ao carregar perfil:', err);
//             this.loading = false;
//           },
//         });
//       },
//       error: (err) => {
//         console.error('Erreur lors du chargement du profil:', err);
//         this.loading = false;
//       },
//     });
//   }

//   // Modo de edição do perfil geral
//   edit(): void {
//     this.editmode = true;
//   }

//   delete(): void {
//     if (!this.user) return;
//     if (
//       !confirm(
//         'Você tem certeza que deseja excluir seu perfil? Esta ação é irreversível.'
//       )
//     ) {
//       return;
//     }
//     this.userService.deleteUser(this.user.id!).subscribe({
//       next: (data) => {
//         console.log('Perfil excluído com sucesso:', data);
//         this.authService.logout();
//         this.router.navigate(['/auth']);
//       },
//       error: (err) => {
//         console.error('Erro ao excluir perfil:', err);
//       },
//     });
//   }

//   annuler(): void {
//     this.editmode = false;
//     this.ngOnInit();
//   }

//   onFilesSelected(event: Event): void {
//     this.selectedImages = [];
//     this.selectedFiles = [];

//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       for (let i = 0; i < input.files.length; i++) {
//         let file = input.files[i];
//         this.selectedFiles.push(file);

//         const reader = new FileReader();
//         reader.onload = (e: any) => this.selectedImages.push(e.target.result);
//         reader.readAsDataURL(file);
//       }
//     }
//   }

//   submit(): void {
//     const formData = new FormData();

//     formData.append('firstname', this.user!.firstname!);
//     formData.append('lastname', this.user!.lastname!);
//     formData.append('email', this.user!.email!);
//     if (this.selectedFiles.length > 0) {
//       formData.append('photo', this.selectedFiles[0]);
//     }

//     this.userService.updateUser(this.user!.id!, formData).subscribe({
//       next: (data) => {
//         console.log('Perfil atualizado com sucesso:', data);
//         this.editmode = false;
//       },
//       error: (err) => {
//         console.error('Erro ao atualizar perfil:', err);
//       },
//     });
//   }


//   // Métodos para propriedades

// toggleEdit(property: any): void {
//   if (!this.user?.properties) return;


//   if (this.editpropertymode === property) {
//     this.editpropertymode = false;
//   } else {
//     this.editpropertymode = property;
//   }
// }


// saveProperty(property: any): void {
//   if (!this.user?.properties) return;

//   console.log('Salvar propriedade:', property);


//   this.editpropertymode = false; // sai do modo edição
// }


// deleteProperty(property: any): void {
//   if (!this.user?.properties) return;

//   if (!confirm('Você tem certeza que deseja excluir esta propriedade?')) return;

//   console.log('Deletar propriedade:', property);
//   const index = this.user.properties.indexOf(property);
//   if (index > -1) {
//     this.user.properties.splice(index, 1);
//   }


//   if (this.editpropertymode === property) {
//     this.editpropertymode = false;
//   }
// }



// submitProperty(property: any): void {
//   if (!property.id) {
//     console.error('Propriedade sem ID');
//     return;
//   }

//   const formData = new FormData();
//   formData.append('title', property.title);
//   formData.append('propertyType', property.propertyType);
//   formData.append('listingType', property.listingType);
//   formData.append('description', property.description);
//   formData.append('address', property.address);
//   formData.append('city', property.city);
//   formData.append('postCode', property.postCode);
//   formData.append('country', property.country);
//   formData.append('totalArea', property.totalArea.toString());
//   formData.append('price', property.price.toString());
//   formData.append('userId', this.user!.id!.toString());

//   if (this.selectedFiles?.length) {
//     this.selectedFiles.forEach(File => formData.append('photos', File));
//   }

//   this.propertyService.updateProperty(property.id, formData).subscribe({
//     next: (data) => {
//       console.log('Propriedade atualizada com sucesso:', data);
//       this.editpropertymode = false;
//       this.saveProperty(property);
//     },
//     error: (err) => {
//       console.error('Erro ao atualizar propriedade:', err);
//     }
//   });
// }



// }


import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { PropertyService } from '../../services/property/property.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule, TruncatePipe, RouterLink],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {
  user: User | null = null;
  loading = true;
  editmode = false;
  editpropertymode: any = false;


  selectedImages: string[] = [];
  selectedFiles: File[] = [];


  propertySelectedImages: { [key: number]: string[] } = {};
  propertySelectedFiles: { [key: number]: File[] } = {};



  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser().subscribe({
      next: (data) => {
        if (!data) {
          this.loading = false;
          return;
        }

        this.user = data;
        this.loading = false;

        this.userService.getUserWithProperties(data.id!).subscribe({
          next: (data) => {
            this.user = data;
            if (this.user && this.user.properties) {
              this.user.properties = this.user.properties.map((p: any) => ({
                ...p,
                editMode: false,
              }));
            }
            this.loading = false;
          },
          error: (err) => {
            console.error('Erro ao carregar perfil:', err);
            this.loading = false;
          },
        });
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil:', err);
        this.loading = false;
      },
    });
  }

  edit(): void {
    this.editmode = true;
  }

  delete(): void {
    if (!this.user) return;
    if (
      !confirm(
        'Você tem certeza que deseja excluir seu perfil? Esta ação é irreversível.'
      )
    ) {
      return;
    }
    this.userService.deleteUser(this.user.id!).subscribe({
      next: (data) => {
        console.log('Perfil excluído com sucesso:', data);
        this.authService.logout();
        this.router.navigate(['/auth']);
      },
      error: (err) => {
        console.error('Erro ao excluir perfil:', err);
      },
    });
  }

  annuler(): void {
    this.editmode = false;
    this.ngOnInit();
  }


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





  onPropertyFilesSelected(event: Event, propertyId: number): void {

    if (!this.propertySelectedImages[propertyId]) {
      this.propertySelectedImages[propertyId] = [];
    }
    if (!this.propertySelectedFiles[propertyId]) {
      this.propertySelectedFiles[propertyId] = [];
    }


    this.propertySelectedImages[propertyId] = [];
    this.propertySelectedFiles[propertyId] = [];

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      for (let i = 0; i < input.files.length; i++) {
        let file = input.files[i];
        this.propertySelectedFiles[propertyId].push(file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.propertySelectedImages[propertyId].push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }


  removeSelectedPropertyPhoto(propertyId: number, index: number): void {
    if (this.propertySelectedImages[propertyId]) {
      this.propertySelectedImages[propertyId].splice(index, 1);
    }
    if (this.propertySelectedFiles[propertyId]) {
      this.propertySelectedFiles[propertyId].splice(index, 1);
    }
  }

  submit(): void {
    const formData = new FormData();

    formData.append('firstname', this.user!.firstname!);
    formData.append('lastname', this.user!.lastname!);
    formData.append('email', this.user!.email!);
    if (this.selectedFiles.length > 0) {
      formData.append('photo', this.selectedFiles[0]);
    }

    this.userService.updateUser(this.user!.id!, formData).subscribe({
      next: (data) => {
        console.log('Perfil atualizado com sucesso:', data);
        this.editmode = false;
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Erro ao atualizar perfil:', err);
      },
    });
  }


  toggleEdit(property: any): void {
    if (!this.user?.properties) return;

    if (this.editpropertymode === property) {
      this.editpropertymode = false;

      if (property.id) {
        this.propertySelectedImages[property.id] = [];
        this.propertySelectedFiles[property.id] = [];
      }
    } else {
      this.editpropertymode = property;
    }
  }

  saveProperty(property: any): void {
    if (!this.user?.properties) return;
    console.log('Enregistrer la propriété :﻿:', property);
    this.editpropertymode = false;
  }

  deleteProperty(property: any): void {
    if (!this.user?.properties) return;

    if (!confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?'))
      return;

    this.propertyService.deleteProperty(property.id).subscribe({
      next: () => {
        console.log('Propriété supprimée avec succès!');
        const index = this.user!.properties!.indexOf(property);
        if (index > -1) {
          this.user!.properties!.splice(index, 1);
        }
        if (this.editpropertymode === property) {
          this.editpropertymode = false;
        }
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la propriété:', err);
        alert('Erreur lors de la suppression de la propriété.');
      },
    });
  }

  submitProperty(property: any): void {
    if (!property.id) {
      console.error('Propriedade sem ID');
      return;
    }

    const formData = new FormData();
    formData.append('title', property.title);
    formData.append('propertyType', property.propertyType);
    formData.append('listingType', property.listingType);
    formData.append('description', property.description);
    formData.append('address', property.address);
    formData.append('city', property.city);
    formData.append('postCode', property.postCode);
    formData.append('country', property.country);
    formData.append('totalArea', property.totalArea.toString());
    formData.append('price', property.price.toString());
    formData.append('userId', this.user!.id!.toString());


    if (
      this.propertySelectedFiles[property.id] &&
      this.propertySelectedFiles[property.id].length > 0
    ) {
      this.propertySelectedFiles[property.id].forEach((file) => {
        formData.append('photos_to_delete[]', property.id.toString());
        formData.append('photos[]', file);
      });
    }

    this.propertyService.updateProperty(property.id, formData).subscribe({
      next: (data) => {
        console.log('Propriété mise à jour avec succès:', data);
        this.editpropertymode = false;

        this.propertySelectedImages[property.id] = [];
        this.propertySelectedFiles[property.id] = [];

        this.ngOnInit();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la propriété:', err);
        alert('Erreur lors de la mise à jour de la propriété. Veuillez vérifier les données et réessayer.');
      },
    });
  }
}
