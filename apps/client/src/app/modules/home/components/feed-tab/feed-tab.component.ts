import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../shared/model/IUser';
import { TAB } from '../../../../shared/constants/home';
import { AppStateService } from '../../../../services/common/appStateService';
import { ArticleService } from '../../../../services/article.service';
import { Utilities } from '../../../../shared/utilities/utilities';
import { IArticle } from '../../../../shared/model/IArticle';

@Component({
  selector: 'conduit-feed-tab',
  templateUrl: './feed-tab.component.html',
  styleUrls: ['./feed-tab.component.scss'],
})

export class FeedTabComponent implements OnInit {

  public currentTab: string = TAB.GLOBAL;
  private currentUser!: IUser;
  private token!: string;
  public articles: IArticle[] = [];

  constructor(
    private readonly utilities: Utilities,
    private readonly articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.currentUser = AppStateService.getCurrentUserStatic();
    this.token = AppStateService.getUserTokenStatic();

    this.getFeed();
  }

  tabChange(tab: string) {
    this.currentTab = tab;
  }

  getFeed() {
    if (this.currentTab === TAB.YOUR) {
      // TODO: get current user articles
    } else {
      this.articleService
        .getAll(this.currentUser.email, this.token)
        .subscribe({
          next: (response) => {
            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }

            if (response.data) {
              const data = response.data;
              this.articles = [...Object(data).getAllArticles as IArticle[]];
            }
          },
          error: (err) => {
            this.utilities.onErr(err);
          }
        })
    }
  }

  get yourTabName(): string {
    return TAB.YOUR;
  }

  get globalTabName(): string {
    return TAB.GLOBAL;
  }
}
