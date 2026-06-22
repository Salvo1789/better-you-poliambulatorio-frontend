import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { ApiService, BookingRequest } from '../../core/services/api.service';
import { Service } from '../../models/service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, SectionTitleComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  services: Service[] = [];
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  servicesError = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService
  ) {}

  bookingForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    phone: ['', [Validators.required, Validators.maxLength(40)]],
    service: ['', [Validators.required, Validators.maxLength(120)]],
    message: ['', Validators.maxLength(1000)]
  });

  ngOnInit(): void {
    this.api.getServices().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: () => {
        this.servicesError = 'Non siamo riusciti a caricare le specializzazioni.';
      }
    });
  }

  submit(): void {
    this.submitSuccess = false;
    this.submitError = '';

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const request = this.bookingForm.getRawValue() as BookingRequest;
    this.isSubmitting = true;

    this.api.createBooking(request)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe({
        next: () => {
          this.submitSuccess = true;
          this.bookingForm.reset();
        },
        error: () => {
          this.submitError = 'Non siamo riusciti a inviare la richiesta. Riprova tra poco o contattaci direttamente.';
        }
      });
  }

}
