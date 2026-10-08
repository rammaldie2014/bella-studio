import { Component } from '@angular/core';
import { NAVIGATION_LINKS } from '../../config/navigation';
import { socialConfig } from '../../config/social.config';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  protected readonly year = new Date().getFullYear();
  protected readonly links = NAVIGATION_LINKS;
  protected readonly socialLinks = socialConfig.filter(link => link.url?.startsWith('https://'));
}
