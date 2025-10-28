import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { last } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  form: FormGroup;
  submitting = false;
  submitted = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  // onSubmit() {
  //   if (this.form.invalid) return;
  //   this.submitting = true;
  //   this.error = null;
  //   this.http.post('https://localhost:8000/contact', this.form.value).subscribe({
  //     next: () => {
  //       this.submitted = true;
  //       this.submitting = false;
  //       this.form.reset();
  //     },
  //     error: (err) => {
  //       this.error = 'Submission failed';
  //       this.submitting = false;
  //       console.error('Erro formulaire not sent:', err);
  //     },
  //   });
  // }
    onSubmit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    this.error = null;
    this.submitted = false;

    const formData = {
      firstname: this.form.value.firstname,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      message: this.form.value.message
    };

    // ✅ ADICIONE HEADERS EXPLICITAMENTE
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this.http.post('https://localhost:8000/contact', formData, { headers }).subscribe({
      next: (response) => {
        console.log('✅ Sucesso:', response);
        this.submitted = true;
        this.submitting = false;
        this.form.reset();
      },
      error: (err) => {
        console.error('❌ Erro completo:', err);
        this.error = 'Erreur lors de l\'envoi. Veuillez réessayer.';
        this.submitting = false;
      }
    });
  }
}

