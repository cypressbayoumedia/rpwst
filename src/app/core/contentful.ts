import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { marked } from 'marked';
const CONFIG = {
  space: 'dew243p4qvo2',
    accessToken: 'Ktz9IsNDs98rwxrIfFc1XbfpAjAtVNb2cN-mdEj_0uQ',

  contentTypeIds: {
    events:'Events',
    gallery:'gallery',
    clubs:'Clubs',
    resources:'Resources',

  }
}

@Injectable({
  providedIn: 'root'
})
export class Contentful {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });
  constructor() { }

  //Clubs
  get_clubs(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.clubs
    }, query))
    .then(res => res.items);
  }
  get_club(slug: string): Promise<Entry<any>> {
    return this.get_clubs({ 'fields.url': slug })
    .then(items => items[0])
  }

  get_events(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: CONFIG.contentTypeIds.events,
      order:'fields.dateTime'
    }, query))
    .then(res => res.items);
  }
  get_event(slug: string): Promise<Entry<any>> {
    return this.get_events({ 'fields.url': slug, limit: 1  })
    .then(items => items[0])
  }

   // convert markdown string to 
 markdownToHtml(md: string) {

  return marked(md)
}

}
