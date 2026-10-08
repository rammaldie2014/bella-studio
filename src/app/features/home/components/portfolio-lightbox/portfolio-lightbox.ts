import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, afterNextRender, computed, inject, input, output, signal } from '@angular/core';
import { PORTFOLIO_CATEGORY_LABELS, PortfolioItem } from '../../models/portfolio-item';

@Component({
  selector: 'app-portfolio-lightbox',
  standalone: true,
  templateUrl: './portfolio-lightbox.html',
  styleUrl: './portfolio-lightbox.scss',
})
export class PortfolioLightboxComponent implements OnInit, OnDestroy {
  readonly items = input.required<readonly PortfolioItem[]>();
  readonly initialIndex = input(0);
  readonly dismissed = output<void>();
  protected readonly labels = PORTFOLIO_CATEGORY_LABELS;
  protected readonly index = signal(0);
  protected readonly current = computed(() => this.items()[this.index()]);
  private readonly document = inject(DOCUMENT);
  private previousFocus: HTMLElement | null = null;
  private previousOverflow = '';
  private scrollLocked = false;
  @ViewChild('dialog', { static: true }) private dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('closeButton', { static: true }) private closeButton!: ElementRef<HTMLButtonElement>;

  constructor() {
    afterNextRender(() => {
      this.previousFocus = this.document.activeElement instanceof HTMLElement ? this.document.activeElement : null;
      this.previousOverflow = this.document.body.style.overflow;
      this.dialog.nativeElement.showModal();
      this.document.body.style.overflow = 'hidden';
      this.scrollLocked = true;
      this.closeButton.nativeElement.focus();
    });
  }

  ngOnInit(): void {
    this.index.set(Math.max(0, Math.min(this.initialIndex(), this.items().length - 1)));
  }

  protected move(direction: number): void {
    const count = this.items().length;
    if (count > 0) this.index.update(index => (index + direction + count) % count);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      this.move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  protected onCancel(event: Event): void {
    event.preventDefault();
    this.dismissed.emit();
  }

  protected onBackdropClick(event: MouseEvent): void {
    if (event.target !== this.dialog.nativeElement) return;
    const bounds = this.dialog.nativeElement.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) this.dismissed.emit();
  }

  ngOnDestroy(): void {
    if (this.dialog.nativeElement.open) this.dialog.nativeElement.close();
    if (this.scrollLocked) this.document.body.style.overflow = this.previousOverflow;
    if (this.previousFocus?.isConnected) this.previousFocus.focus({ preventScroll: true });
  }
}
