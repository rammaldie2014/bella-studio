import { Component } from '@angular/core';
import { MAKEUP_SERVICES } from '../../data/makeup-services';
import { ServiceCardComponent } from '../service-card/service-card';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ServiceCardComponent],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class ServicesComponent {
  protected readonly services = MAKEUP_SERVICES;
}
