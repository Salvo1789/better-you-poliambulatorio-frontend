import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CLINIC_INFO } from '../../../data/clinic-info.data';
import { CONTACTS } from '../../../data/contacts.data';
import { OPENING_HOURS } from '../../../data/opening-hours.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  clinic = CLINIC_INFO;
  contacts = CONTACTS;
  hours = OPENING_HOURS;

  year = new Date().getFullYear();

}