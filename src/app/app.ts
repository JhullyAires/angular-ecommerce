import { Component, signal, Renderer2, OnInit, Injector, effect } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  readonly currentTheme = signal<'light' | 'dark'>('light');

  protected readonly title = signal('angular-ecommerce');

  constructor(
    private renderer: Renderer2,
    private injector: Injector
  ) {
    effect(() => {
      const theme = this.currentTheme();
      this.applyThemeToBody(theme);
    }, { injector: this.injector });
  }

  private applyThemeToBody(theme: 'light' | 'dark'): void {
      if (theme === 'dark') {
          this.renderer.addClass(document.body, 'dark');
      } else {
          this.renderer.removeClass(document.body, 'dark');
      }
  }

  public toggleTheme(): void {
    this.currentTheme.update(theme => (theme === 'light' ? 'dark' : 'light'));
  }
}
