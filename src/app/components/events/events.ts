import { Component, computed, inject, resource, Signal } from '@angular/core';
import { Contentful } from '../../core/contentful';
import { Entry } from 'contentful';
import { DatePipe } from '@angular/common';
import { MdToHtmlPipe } from '../../core/md-to-html-pipe';

@Component({
  selector: 'app-events',
  imports: [DatePipe, MdToHtmlPipe],
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events {
  private contentfulService = inject(Contentful);

  eventsResource = resource({
    // `loader` is the async function that fetches the data.
    loader: (): Promise<Entry<any>[]> => {
      return this.contentfulService.get_events();
    }
  });

  // Expose signals for template consumption
  readonly isLoading: Signal<boolean> = computed(() => this.eventsResource.isLoading());
  readonly error: Signal<unknown | undefined> = computed(() => this.eventsResource.error());
  readonly events: Signal<Entry<any>[] | undefined> = computed(() => this.eventsResource.value());
}
