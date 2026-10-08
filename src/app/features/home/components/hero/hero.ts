import { Component } from '@angular/core';
import { bookingConfig } from '../../../../shared/config/booking.config';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  protected readonly booking = bookingConfig;
}
