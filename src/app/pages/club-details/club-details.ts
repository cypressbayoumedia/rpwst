import { Component, computed, inject, input, resource, signal } from '@angular/core';
import { Contentful } from '../../core/contentful';
import { DatePipe} from '@angular/common';
import { Entry } from 'contentful';
import { MdToHtmlPipe } from '../../core/md-to-html-pipe';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-club-details',
  imports: [MdToHtmlPipe, RouterLink, DatePipe],
  templateUrl: './club-details.html',
  styleUrl: './club-details.css'
})
export class ClubDetails {

  private contentfulService = inject(Contentful);

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

// Function to toggle the signal's value
togglePastEvents(): void {
  this.showPastEvents.update(value => !value);
}

// Your existing 'showAllNewsletters' signal and its toggle function

toggleShowAllNewsletters(): void {
  this.showAllNewsletters.update(value => !value);
}
}
