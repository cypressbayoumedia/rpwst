import { Component, inject, input, resource } from '@angular/core';
import { Contentful } from '../../core/contentful';
import { SlicePipe} from '@angular/common';
import { Entry } from 'contentful';
import { MdToHtmlPipe } from '../../core/md-to-html-pipe';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-club-details',
  imports: [MdToHtmlPipe, RouterLink, SlicePipe],
  templateUrl: './club-details.html',
  styleUrl: './club-details.css'
})
export class ClubDetails {
  private contentfulService = inject(Contentful);

  // 1. Get the 'slug' from the route parameters.
  // This requires `withComponentInputBinding()` in your routing config.
  slug = input.required<string>();

  // 2. Create a resource signal.
  // This will automatically re-fetch when the `slug()` input signal changes.
  clubResource = resource({
    // `params` defines the reactive dependencies for the loader.
    params: () => ({ slug: this.slug() }),
    // `loader` is the async function that fetches the data.
    loader: ({ params }) => this.contentfulService.get_club(params.slug),
  });

  
}
