import { Component, computed, inject, input, resource, signal, effect } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Contentful } from '../../core/contentful';
import { DatePipe, ViewportScroller } from '@angular/common';
import { Entry } from 'contentful';
import { MdToHtmlPipe } from '../../core/md-to-html-pipe';
import { RouterLink, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-club-details',
  imports: [MdToHtmlPipe, RouterLink, DatePipe],
  templateUrl: './club-details.html',
  styleUrl: './club-details.css'
})
export class ClubDetails {

  private contentfulService = inject(Contentful);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private viewportScroller = inject(ViewportScroller);
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      const club = this.clubResource.value();
      if (club) {
        const clubName = club.fields.title || 'Club Details';
        const aboutText = club.fields.missionabout || '';
        const description = aboutText.length > 150 ? aboutText.substring(0, 147) + '...' : aboutText || 'Learn more about this Republican club in St. Tammany Parish.';
        const logoUrl = club.fields.image?.fields?.file?.url ? `https:${club.fields.image.fields.file.url}` : '';

        this.titleService.setTitle(`${clubName} | St. Tammany Parish Republicans`);
        this.metaService.updateTag({ name: 'description', content: description });
        this.metaService.updateTag({ property: 'og:title', content: `${clubName} | St. Tammany Parish Republicans` });
        this.metaService.updateTag({ property: 'og:description', content: description });
        if (logoUrl) {
          this.metaService.updateTag({ property: 'og:image', content: logoUrl });
        }

        // Handle scrolling to fragment after data renders
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          // Because Angular's change detection happens asynchronously after the resource resolves,
          // the DOM element won't exist immediately. We poll for it until it appears.
          const checkExist = setInterval(() => {
            if (document.getElementById(fragment)) {
              this.viewportScroller.scrollToAnchor(fragment);
              clearInterval(checkExist);
            }
          }, 100);

          // Give up after 3 seconds so we don't leak memory if the section doesn't exist
          setTimeout(() => clearInterval(checkExist), 3000);
        }
      }
    });
  }

  // 1. Get the 'slug' from the route parameters.
  // This requires `withComponentInputBinding()` in your routing config.
  slug = input.required<string>();
  showPastEvents = signal(false);
  showAllNewsletters = signal(false);
  clubResource = resource({
    // `params` defines the reactive dependencies for the loader.
    params: () => ({ slug: this.slug() }),
    // `loader` is the async function that fetches the data.
    loader: ({ params }): Promise<Entry<any> | undefined> => {
      return this.contentfulService.get_club(params.slug);
    }
  });

  // Computed signal to get only upcoming events and sort them
  upcomingEvents = computed(() => {
    const events = this.clubResource.value()?.fields.events || [];
    const now = new Date();
    return events
      .filter((event: any) => new Date(event.fields.dateTime) >= now)
      .sort((a: any, b: any) => new Date(a.fields.dateTime).getTime() - new Date(b.fields.dateTime).getTime());
  });

  // Computed signal to get only past events and sort them
  pastEvents = computed(() => {
    const events = this.clubResource.value()?.fields.events || [];
    const now = new Date();
    return events
      .filter((event: any) => new Date(event.fields.dateTime) < now)
      .sort((a: any, b: any) => new Date(b.fields.dateTime).getTime() - new Date(a.fields.dateTime).getTime());
  });

  // Computed signal to sort gallery photos by upload date (newest first)
  sortedClubPhotos = computed(() => {
    const photos = this.clubResource.value()?.fields.clubPhotos || [];
    // Sort by sys.createdAt descending to show newest photos first
    return [...photos].sort((a: any, b: any) => {
      const dateA = a.sys?.createdAt || 0;
      const dateB = b.sys?.createdAt || 0;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
  });

  // Function to toggle the signal's value
  togglePastEvents(): void {
    this.showPastEvents.update(value => !value);
  }

  // Your existing 'showAllNewsletters' signal and its toggle function

  toggleShowAllNewsletters(): void {
    this.showAllNewsletters.update(value => !value);
  }

  // Lightbox Modal signals and methods
  selectedImage = signal<any | null>(null);

  openLightbox(image: any): void {
    this.selectedImage.set(image);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.selectedImage.set(null);
    // Restore body scrolling
    document.body.style.overflow = '';
  }
}
