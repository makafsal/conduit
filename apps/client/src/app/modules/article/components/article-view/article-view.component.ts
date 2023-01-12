import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../../shared/model/IUser';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../../../services/article.service';
import { AppStateService } from '../../../../services/common/appStateService';
import { ERR } from '../../../../shared/constants/common';
import { IArticle } from '../../../../shared/model/IArticle';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'conduit-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss'],
})
export class ArticleViewComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription = new Subscription();
  private articleID!: string;
  public currentUser!: IUser;
  private token!: string;
  public article!: IArticle;

  constructor(
    private router: Router,
    public datePipe: DatePipe,
    private route: ActivatedRoute,
    private readonly articleService: ArticleService,
    private readonly appStateService: AppStateService
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
            if (response?.errors) {
              this.onErr(response.errors[0]);
            }

            if (response.data) {
              const data = response.data;
              this.article = Object(data).getArticleByID as IArticle;
              console.log(this.article)
            }
          },
          error: err => {
            console.log(err)
          }
        })
    }
  }

  deleteArticle() {
    this.articleService
      .delete(this.articleID, this.article.title, this.token)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: err => {
          console.log(err)
        }
      })
  }

  onErr(err: unknown) {
    const error: Error = err as Error;

    if (error['message'] && error['message'] === ERR.UNAUTHORIZED) {
      this.appStateService.resetUser();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
