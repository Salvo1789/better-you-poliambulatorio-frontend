import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './ui-button.component.html',
  styleUrl: './ui-button.component.scss'
})
export class UiButtonComponent {
  @Input() label = 'Button';
  @Input() link = '/';
  @Input() variant: 'primary' | 'secondary' = 'primary';
}