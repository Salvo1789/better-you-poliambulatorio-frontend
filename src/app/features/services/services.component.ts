import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { SERVICES } from '../../data/services.data';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    NgFor,
    SectionTitleComponent,
    ServiceCardComponent,
    CtaBannerComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = SERVICES;
}