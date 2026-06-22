import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Specialist } from '../../../models/specialist';

@Component({
  selector: 'app-specialist-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './specialist-card.component.html',
  styleUrl: './specialist-card.component.scss'
})
export class SpecialistCardComponent {
  @Input({ required: true}) specialist!: Specialist
}
