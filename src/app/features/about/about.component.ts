import { Component } from '@angular/core';

import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { CtaBannerComponent } from '../../shared/components/cta-banner/cta-banner.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionTitleComponent, CtaBannerComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {}