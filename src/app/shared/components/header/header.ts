import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { bookingConfig } from '../../config/booking.config';
import { NAVIGATION_LINKS } from '../../config/navigation';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  protected readonly booking = bookingConfig;
  protected readonly menuOpen = signal(false);
  protected readonly links = NAVIGATION_LINKS;
  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.menuOpen()) {
      this.closeMenu();
      this.menuToggle?.nativeElement.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  protected onOutsideClick(event: MouseEvent): void {
    if (event.target instanceof Node && !this.host.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }

  @HostListener('window:resize')
  protected onResize(): void {
    if (window.innerWidth >= 1024) this.closeMenu();
  }

  constructor(private readonly host: ElementRef<HTMLElement>) {}
}
