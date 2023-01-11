import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../../../shared/model/IUser';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../../../services/article.service';
import { AppStateService } from 'apps/client/src/app/services/common/appStateService';

@Component({
  selector: 'conduit-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss'],
})
export class ArticleViewComponent implements OnInit {
  private routeSubscription: Subscription = new Subscription();
  private articleID!: string;
  public currentUser!: IUser;
  private token!: string;

  constructor(
    private readonly articleService: ArticleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.url.subscribe(urlSegment => {
      const slug = urlSegment[urlSegment.length - 1].path;
      this.articleID = slug.split('_').pop() || '';
      this.init();
    });
  }

  init() {
    this.currentUser = AppStateService.getCurrentUserStatic();
    this.token = AppStateService.getUserTokenStatic();

    if (this.articleID?.length) {
      this.articleService
        .getByID(this.articleID, this.currentUser.email, this.token)
        .subscribe({
          next: (response) => {
            console.log(response)
          },
          error: err => {
            console.log(err)
          }
        })
    }
  }
}
