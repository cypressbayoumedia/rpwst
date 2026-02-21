import { Component, OnInit, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-clubs',
  imports: [],
  templateUrl: './clubs.html',
  styleUrl: './clubs.css'
})
export class Clubs implements OnInit {

  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit(): void {
    this.titleService.setTitle('Republican Working Women Clubs | St. Tammany Parish');
    this.metaService.updateTag({ name: 'description', content: 'Discover the Republican Working Women Clubs of St. Tammany Parish. Get involved, attend meetings, and support the GOP in our local communities.' });
    this.metaService.updateTag({ property: 'og:title', content: 'Republican Working Women Clubs | St. Tammany Parish' });
    this.metaService.updateTag({ property: 'og:description', content: 'Discover the Republican Working Women Clubs of St. Tammany Parish. Get involved, attend meetings, and support the GOP in our local communities.' });
  }

}
