import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { HeroComponent } from './features/home/components/hero/hero';
import { ServicesComponent } from './features/home/components/services/services';
import { PortfolioComponent } from './features/home/components/portfolio/portfolio';
import { AboutComponent } from './features/home/components/about/about';
import { ContactComponent } from './features/home/components/contact/contact';
import { FooterComponent } from './shared/components/footer/footer';
import { WhatsAppFloatingButtonComponent } from './shared/components/whatsapp-floating-button/whatsapp-floating-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HeroComponent, ServicesComponent, PortfolioComponent, AboutComponent, ContactComponent, FooterComponent, WhatsAppFloatingButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
