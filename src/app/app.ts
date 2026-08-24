import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toolbar } from './components/toolbar/toolbar';
import { SeoService } from './core/seo.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'St. Tammany Parish Republicans';

  constructor(private seoService: SeoService, @Inject(PLATFORM_ID) private platformId: Object) {
    // Only init if we are in browser or SSR context is fine too, 
    // but typically canonicals are set during SSR and updated by client on navigation.
    this.seoService.init();
  }
}
