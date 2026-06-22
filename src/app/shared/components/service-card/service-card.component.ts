import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Service } from '../../../models/service';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: Service
}
