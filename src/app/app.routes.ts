import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ServicesComponent } from './features/services/services.component';
import { SpecialistsComponent } from './features/specialists/specialists.component';
import { BookingComponent } from './features/booking/booking.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'chi-siamo', component: AboutComponent },
  { path: 'specializzazioni', component: ServicesComponent },
  { path: 'specialisti', component: SpecialistsComponent },
  { path: 'prenotazioni', component: BookingComponent },
  { path: 'contatti', component: ContactComponent },
];
