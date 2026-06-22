import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-banner',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './cta-banner.component.html',
  styleUrl: './cta-banner.component.scss'
})
export class CtaBannerComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle = '';
  @Input() buttonText = 'Contattaci';
  @Input() buttonLink = '/contatti';
}
