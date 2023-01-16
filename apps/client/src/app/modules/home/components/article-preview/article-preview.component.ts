import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IArticle } from '../../../../shared/model/IArticle';

@Component({
  selector: 'conduit-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss'],
})
export class ArticlePreviewComponent implements OnInit, OnChanges {
  
  @Input()
  public articles: IArticle[] = [];
  
  ngOnInit(): void {
    console.log(this.articles)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.articles)
  }
}
