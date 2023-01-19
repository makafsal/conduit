import { Component, Input } from '@angular/core';
import { IArticle } from '../../../../shared/model/IArticle';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'conduit-article-listing',
  templateUrl: './article-listing.component.html',
  styleUrls: ['./article-listing.component.scss'],
})
export class ArticleListingComponent {

  @Input()
  public articles: IArticle[] = [];

  constructor(
    public readonly datePipe: DatePipe
  ) { }

  onFavorite(article: IArticle) {
    console.log(article)
  }
}
