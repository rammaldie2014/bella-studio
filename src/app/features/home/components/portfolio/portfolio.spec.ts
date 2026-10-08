import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioComponent } from './portfolio';
import { afterAll, beforeAll } from 'vitest';

describe('PortfolioComponent', () => {
  let fixture: ComponentFixture<PortfolioComponent>;
  let page: HTMLElement;
  const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal');
  const originalClose = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'close');

  // jsdom has no native modal lifecycle. Stub only that browser boundary;
  // focus containment and real Escape behavior require browser verification.
  beforeAll(() => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true, value(this: HTMLDialogElement) { this.open = true; },
    });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true, value(this: HTMLDialogElement) { this.open = false; },
    });
  });
  afterAll(() => {
    for (const [key, descriptor] of [['showModal', originalShowModal], ['close', originalClose]] as const) {
      if (descriptor) Object.defineProperty(HTMLDialogElement.prototype, key, descriptor);
      else Reflect.deleteProperty(HTMLDialogElement.prototype, key);
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PortfolioComponent] }).compileComponents();
    fixture = TestBed.createComponent(PortfolioComponent);
    await fixture.whenStable();
    page = fixture.nativeElement as HTMLElement;
  });

  function cards(): HTMLButtonElement[] {
    return Array.from(page.querySelectorAll<HTMLButtonElement>('.gallery__card'));
  }

  async function filter(label: string): Promise<void> {
    Array.from(page.querySelectorAll<HTMLButtonElement>('.filters button'))
      .find(button => button.textContent?.trim() === label)!.click();
    await fixture.whenStable();
  }

  async function open(index = 0): Promise<HTMLDialogElement> {
    cards()[index].focus();
    cards()[index].click();
    await fixture.whenStable();
    return page.querySelector('dialog')!;
  }

  it('renders six demo images and filters two per category without reloading', async () => {
    expect(cards().length).toBe(6);
    expect(page.textContent).toContain('no trabajos reales');
    for (const category of ['Social', 'Novias', 'Fiesta']) {
      await filter(category);
      expect(cards().length).toBe(2);
      expect(cards().every(card => card.getAttribute('aria-label')?.includes(category))).toBe(true);
      expect(page.querySelector('[aria-pressed="true"]')?.textContent).toBe(category);
    }
    await filter('Todos');
    expect(cards().length).toBe(6);
    expect(page.querySelectorAll('img[loading="lazy"]').length).toBe(6);
  });

  it('opens modally, focuses close, locks scrolling and restores focus and overflow on Escape', async () => {
    const previousOverflow = document.body.style.overflow;
    const trigger = cards()[0];
    const dialog = await open();
    expect(dialog.open).toBe(true);
    expect(document.activeElement).toBe(dialog.querySelector('.close'));
    expect(document.body.style.overflow).toBe('hidden');
    // Native browsers dispatch cancel for Escape; jsdom does not synthesize it from keydown.
    dialog.dispatchEvent(new Event('cancel', { cancelable: true }));
    await fixture.whenStable();
    expect(page.querySelector('dialog')).toBeNull();
    expect(document.body.style.overflow).toBe(previousOverflow);
    expect(document.activeElement).toBe(trigger);
  });

  it('cycles only within the filtered set using buttons and arrow keys', async () => {
    await filter('Novias');
    const dialog = await open();
    const title = () => dialog.querySelector('h2')?.textContent;
    expect(title()).toBe('Novia radiante');
    dialog.querySelector<HTMLButtonElement>('[aria-label="Imagen anterior"]')!.click();
    await fixture.whenStable();
    expect(title()).toBe('Un momento especial');
    dialog.querySelector<HTMLButtonElement>('[aria-label="Imagen siguiente"]')!.click();
    await fixture.whenStable();
    expect(title()).toBe('Novia radiante');
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await fixture.whenStable();
    expect(title()).toBe('Un momento especial');
    dialog.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await fixture.whenStable();
    expect(title()).toBe('Novia radiante');
  });

  it('keeps image clicks open and closes on backdrop and close button', async () => {
    let dialog = await open();
    dialog.querySelector('img')!.click();
    await fixture.whenStable();
    expect(dialog.open).toBe(true);
    dialog.dispatchEvent(new MouseEvent('click', { clientX: -1, clientY: -1, bubbles: true }));
    await fixture.whenStable();
    expect(page.querySelector('dialog')).toBeNull();
    dialog = await open();
    dialog.querySelector<HTMLButtonElement>('.close')!.click();
    await fixture.whenStable();
    expect(page.querySelector('dialog')).toBeNull();
  });
});
