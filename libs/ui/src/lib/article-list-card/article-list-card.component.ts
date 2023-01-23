import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticle } from './models/IArticle';

@Component({
  selector: 'conduit-article-list-card',
  templateUrl: './article-list-card.component.html',
  styleUrls: ['./article-list-card.component.scss'],
})
export class ArticleListCardComponent {

  @Input() articles: IArticle[] = [];
  @Input() disableFavIcon = false;
  @Output() clickFavorite = new EventEmitter<IArticle>();
  @Output() clickProfile = new EventEmitter<IArticle>();
  @Output() clickArticle = new EventEmitter<IArticle>();

  constructor(
    public readonly datePipe: DatePipe
  ) { }

  onFavorite(article: IArticle) {
    this.clickFavorite.emit(article);
  }

  onProfileClick(article: IArticle) {
    this.clickProfile.emit(article);
  }

  onArticleClick(article: IArticle) {
    this.clickArticle.emit(article);
  }
}
