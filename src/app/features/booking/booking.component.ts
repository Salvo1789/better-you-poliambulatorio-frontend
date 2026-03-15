import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [ReactiveFormsModule, SectionTitleComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {

  constructor(private fb: FormBuilder) {}

  bookingForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    service: ['', Validators.required],
    message: ['']
  });

  submit() {
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value);
      alert('Richiesta inviata! Ti contatteremo presto.');
      this.bookingForm.reset();
    }
  }

}