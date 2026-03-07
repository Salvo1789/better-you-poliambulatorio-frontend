import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { CLINIC_INFO } from '../../data/clinic-info.data';
import { CONTACTS } from '../../data/contacts.data';
import { OPENING_HOURS } from '../../data/opening-hours.data';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  clinic = CLINIC_INFO;
  contacts = CONTACTS;
  hours = OPENING_HOURS;
}
