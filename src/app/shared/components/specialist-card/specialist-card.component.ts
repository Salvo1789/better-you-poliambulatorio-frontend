import { Component, Input } from '@angular/core';
import { Specialist } from '../../../models/specialist';

@Component({
  selector: 'app-specialist-card',
  standalone: true,
  imports: [],
  templateUrl: './specialist-card.component.html',
  styleUrl: './specialist-card.component.scss'
})
export class SpecialistCardComponent {
  @Input({ required: true}) specialist!: Specialist
}
