import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ITab } from '@conduit/ui';
import { IArticle } from '../../../../shared/model/IArticle';
import { TAB } from '../../../../shared/constants/common';
import { ArticleService } from '../../../../services/article.service';
import { AppStateService } from 'apps/client/src/app/services/common/appStateService';
import { Utilities } from 'apps/client/src/app/shared/utilities/utilities';
import { IUser } from 'apps/client/src/app/shared/model/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'conduit-articles-tab',
  templateUrl: './articles-tab.component.html',
  styleUrls: ['./articles-tab.component.scss'],
})
export class ArticlesTabComponent implements OnChanges {

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
  private currentUser!: IUser;
  private token!: string;

  constructor(
    private readonly articleService: ArticleService,
    private readonly utilities: Utilities,
    private router: Router,
  ) { }

  ngOnChanges(): void {
    this.currentUser = AppStateService.getCurrentUserStatic();
    this.token = AppStateService.getUserTokenStatic();

    this.getArticles();
  }

  tabChange(tab: ITab) {
    if (tab) {
      this.currentTab = tab.title;
      this.getArticles();
    }
  }

  getArticles() {
    if (!this.profileEmail)
      return;

    if (this.currentTab === TAB.MY) {
      this.articleService
        .getByAuthor(this.profileEmail, this.currentUser.email, this.token)
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
      this.articleService
        .getFavorited(this.profileEmail, this.currentUser.email, this.token)
        .subscribe({
          next: (response) => {
            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }

            if (response.data) {
              const data = response.data;
              this.articles = Object(data).getFavoritedArticles as IArticle[];
            }
          },
          error: (err) => {
            this.utilities.onErr(err);
          }
        })
    }
  }

  onFavorite(article: IArticle) {
    this.disableFavBtn = true;

    if (article.favorited) {
      this.articleService
        .unfavoriteArticle(article.title, this.currentUser.email, this.token)
        .subscribe({
          next: (response) => {
            this.disableFavBtn = false;

            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }
            if (response.data) {
              this.getArticles();
            }
          },
          error: (err) => {
            this.disableFavBtn = false;

            this.utilities.onErr(err);
          }
        });
    } else {
      this.articleService
        .favoriteArticle(article.title, this.currentUser.email, this.token)
        .subscribe({
          next: (response) => {
            this.disableFavBtn = false;

            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }
            if (response.data) {
              this.getArticles();
            }
          },
          error: (err) => {
            this.disableFavBtn = false;

            this.utilities.onErr(err);
          }
        });
    }
  }

  profileClick(article: IArticle) {
    this.router.navigate([`/profile/${article.author.username}`]);
  }

  articleClick(article: IArticle) {
    this.router.navigate([`/articles/${article.slug}`]);
  }
}
