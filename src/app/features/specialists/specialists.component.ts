import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';

import { ApiService } from '../../core/services/api.service';
import { Specialist } from '../../models/specialist';

import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { SpecialistCardComponent } from '../../shared/components/specialist-card/specialist-card.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-specialists',
  standalone: true,
  imports: [
    NgFor,
    SectionTitleComponent,
    SpecialistCardComponent,
    CtaBannerComponent
  ],
  templateUrl: './specialists.component.html',
  styleUrl: './specialists.component.scss'
})
export class SpecialistsComponent implements OnInit {
  private api = inject(ApiService);

  specialists: Specialist[] = [];

  ngOnInit(): void {
    this.api.getSpecialists().subscribe((specialists) => {
      this.specialists = specialists;
    });
  }
}