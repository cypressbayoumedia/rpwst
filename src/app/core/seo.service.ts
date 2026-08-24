import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private baseUrl = 'https://www.stprov.org';

  constructor(
    @Inject(DOCUMENT) private dom: Document,
    private router: Router
  ) {}

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateCanonicalUrl(event.urlAfterRedirects);
    });
  }

  private updateCanonicalUrl(url: string) {
    const head = this.dom.getElementsByTagName('head')[0];
    let element: HTMLLinkElement | null = this.dom.querySelector(`link[rel='canonical']`);
    
    if (!element) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      element.setAttribute('rel', 'canonical');
      head.appendChild(element);
    }
    
    const cleanUrl = url.split('?')[0];
    element.setAttribute('href', `${this.baseUrl}${cleanUrl === '/' ? '' : cleanUrl}`);
  }
}
