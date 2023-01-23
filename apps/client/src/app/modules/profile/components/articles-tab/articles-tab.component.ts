import { Component, Input } from '@angular/core';
import { ITab } from '@conduit/ui';
import { IArticle } from '../../../../shared/model/IArticle';
import { TAB } from '../../../../shared/constants/common';
import { ArticleService } from '../../../../services/article.service';
import { AppStateService } from 'apps/client/src/app/services/common/appStateService';
import { Utilities } from 'apps/client/src/app/shared/utilities/utilities';

@Component({
  selector: 'conduit-articles-tab',
  templateUrl: './articles-tab.component.html',
  styleUrls: ['./articles-tab.component.scss'],
})
export class ArticlesTabComponent {

  @Input() profileEmail = '';

  public tabs: ITab[] = [
    {
      title: TAB.MY
    },
    {
      title: TAB.FAVORITED
    }
  ];
  public articles: IArticle[] = [];
  private currentTab = '';
  public disableFavBtn = false;

  constructor(
    private readonly articleService: ArticleService,
    private readonly utilities: Utilities,
  ) { }

  tabChange(tab: ITab) {
    if (tab) {
      this.currentTab = tab.title;
      this.getArticles();
    }
  }

  getArticles() {
    if (this.currentTab === TAB.MY) {
      this.articleService
        .getByAuthor(this.profileEmail, AppStateService.getCurrentUserStatic().email, AppStateService.getUserTokenStatic())
        .subscribe({
          next: (response) => {
            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }

            if (response.data) {
              const data = response.data;
              this.articles = Object(data).getArticlesByAuthor as IArticle[];
            }
          },
          error: (err) => {
            this.utilities.onErr(err);
          }
        })
    } else {
      
    }
  }

  onFavorite(article: IArticle) {
    console.log(article)
  }

  profileClick(article: IArticle) {
    console.log('profile cliked')
  }

  articleClick(article: IArticle) {
    console.log('article click')
  }
}
