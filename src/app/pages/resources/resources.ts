import { Component } from '@angular/core';

interface ResourceLink {
  title: string;
  url?: string; // Optional, as some rows in the image have no link
  description?: string;
}

@Component({
  selector: 'app-resources',
  imports: [],
  templateUrl: './resources.html',
  styleUrl: './resources.css'
})
export class Resources {

  // Data transcribed from the first table in your image
  republicanResources: ResourceLink[] = [
    { title: 'National GOP', url:'https://www gop.com', description: 'Official website for the National Republican Party.' },
    { title: 'National GOP Elected Officials', description: 'Find nationally elected Republican officials.' },
    { title: 'State GOP Elected Officials', url:'https://www.lagop.com/elected-officials-map', description: 'Find state-level elected Republican officials.' },
    { title: 'Local GOP Elected Officials', description: 'Find locally elected Republican officials.' },
    { title: 'Republican National Committee', url: 'https://www.rnc.org' },
    { title: 'National Federation of Republican Women', url: 'https://www.nfrw.org' },
    { title: 'Louisiana Federation of Republican Women', url: 'https://lfrw.org' },
    { title: 'Republican Party of Louisiana', url: 'https://www.lagop.com' },
    { title: 'RPEC (Republican Parish Executive Committee – St. Tammany)', url: 'https://stprepublicanparty.com' },
    { title: '2024 Republican Party Platform', url: 'https://www.presidency.ucsb.edu/documents/2024-republican-party-platform' },
  ];

  // Data transcribed from the second table in your image
  governmentResources: ResourceLink[] = [
    { title: 'Louisiana Legislature', url: 'https://legis.la.gov' },
    { title: 'St Tammany Parish Government', url: 'https://www.stpgov.org' },
    { title: 'Secretary of State', url: 'https://www.sos.la.gov', description: 'Find Elected Officials, Sample Ballots, Geaux Vote App, Election Dates' },
    { title: 'St. Tammany Clerk of Court', url: 'https://www.sttammanyclerk.org' },
    { title: 'St. Tammany Parish Assessor’s Office', url: 'https://stpao.org/' },
    { title: 'St. Tammany Parish Sheriff\'s Office', url: 'https://www.stpso.com/' },
  ];
}
