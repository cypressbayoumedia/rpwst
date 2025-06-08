import { inject, Pipe, PipeTransform } from '@angular/core';
import { Contentful } from './contentful';
import { marked } from 'marked';
@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlPipe implements PipeTransform {

  private contentful = inject(Contentful);

  transform(value: any): any {
    return this.contentful.markdownToHtml(value); 
  }


}
