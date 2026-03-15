import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

import { SPECIALISTS } from '../../data/specialists.data';
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
export class SpecialistsComponent {
  specialists = SPECIALISTS;
}