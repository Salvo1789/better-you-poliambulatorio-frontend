import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

import { SERVICES } from '../../data/services.data';
import { SPECIALISTS } from '../../data/specialists.data';

import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { SpecialistCardComponent } from '../../shared/components/specialist-card/specialist-card.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { ApiService } from '../../core/services/api.service';
import { Service } from '../../models/service';
import { Specialist } from '../../models/specialist';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    SectionTitleComponent,
    ServiceCardComponent,
    SpecialistCardComponent,
    CtaBannerComponent,
    UiButtonComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService)

  services: Service[] = [];
  specialists: Specialist[] = [];

  ngOnInit(): void {
    this.api.getServices().subscribe((services) => {
      this.services = services;
    });

    this.api.getSpecialists().subscribe((specialists) => {
      this.specialists = specialists.slice(0, 3);
    });
  }
}
