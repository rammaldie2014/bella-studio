import { Component, computed, signal } from '@angular/core';
import { PORTFOLIO_ITEMS } from '../../data/portfolio-items';
import { PORTFOLIO_CATEGORY_LABELS, PortfolioCategory } from '../../models/portfolio-item';
import { PortfolioLightboxComponent } from '../portfolio-lightbox/portfolio-lightbox';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [PortfolioLightboxComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class PortfolioComponent {
  protected readonly labels = PORTFOLIO_CATEGORY_LABELS;
  protected readonly filters: readonly { value: 'todos' | PortfolioCategory; label: string }[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'social', label: 'Social' },
    { value: 'novias', label: 'Novias' },
    { value: 'fiesta', label: 'Fiesta' },
  ];
  protected readonly activeFilter = signal<'todos' | PortfolioCategory>('todos');
  protected readonly activeLabel = computed(() => {
    const filter = this.activeFilter();
    return filter === 'todos' ? 'Todas las categorías' : this.labels[filter];
  });
  protected readonly filteredItems = computed(() => PORTFOLIO_ITEMS.filter(
    item => this.activeFilter() === 'todos' || item.category === this.activeFilter(),
  ));
  protected readonly selectedIndex = signal<number | null>(null);

  protected openItem(index: number, event: MouseEvent): void {
    // Ensure restoration also works in browsers that do not focus buttons on click.
    if (event.currentTarget instanceof HTMLButtonElement) event.currentTarget.focus();
    this.selectedIndex.set(index);
  }

  protected selectFilter(filter: 'todos' | PortfolioCategory): void {
    this.selectedIndex.set(null);
    this.activeFilter.set(filter);
  }
}
