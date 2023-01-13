import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../../../shared/model/IUser';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../../../services/article.service';
import { AppStateService } from '../../../../services/common/appStateService';
import { ERR } from '../../../../shared/constants/common';
import { IArticle } from '../../../../shared/model/IArticle';
import { DatePipe } from '@angular/common';
import { IComment } from '../../../../shared/model/IComment';
import { CommentService } from '../../../../services/comment.service';

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
  public comment!: string;
  public comments: IComment[] = [];
  public disableCommentDelete = false;
  public disableDeleteArticle = false;

  constructor(
    private router: Router,
    public datePipe: DatePipe,
    private route: ActivatedRoute,
    private readonly articleService: ArticleService,
    private readonly appStateService: AppStateService,
    private readonly commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.url.subscribe(urlSegment => {
      const slug = urlSegment[urlSegment.length - 1].path;
      this.articleID = slug.split('_').pop() || '';
      this.init();
      this.getComments();
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
            }
          },
          error: err => {
            this.onErr(err);
          }
        })
    }
  }

  getComments() {
    this.commentService
      .getByArticle(this.articleID, AppStateService.getUserTokenStatic())
      .subscribe({
        next: response => {
          if (response.errors) {
            this.comments = [];
            this.onErr(response.errors[0]);
          }

          if (response.data) {
            const data = response.data;
            this.comments = Object(data).getCommentsByArticle as IComment[];
            this.comments = this.comments.slice().sort((prev, next) => new Date(next.created_at).getTime() - new Date(prev.created_at).getTime());
          }
        },
        error: (err) => {
          this.onErr(err);
        }
      });
  }

  postComment() {
    const comment = {
      body: this.comment,
      author: this.currentUser.email,
      article: this.articleID,
      created_at: new Date().toISOString(),
    }

    this.commentService
      .create(comment, this.token)
      .subscribe({
        next: (response) => {
          if (response.errors) {
            this.onErr(response.errors[0]);
          }

          this.comment = '';
          this.getComments();
        },
        error: (err) => {
          this.comment = '';
          this.getComments();
          this.onErr(err);
        }
      });
  }

  deleteArticle() {
    this.disableDeleteArticle = true;

    this.articleService
      .delete(this.articleID, this.article.title, this.token)
      .subscribe({
        next: (response) => {
          this.disableDeleteArticle = true;
          if (response.errors) {
            this.onErr(response.errors[0]);
          }
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.disableDeleteArticle = true;
          this.onErr(err);
        }
      })
  }

  deleteComment(comment: IComment) {
    if (comment?.id && !this.disableCommentDelete) {
      this.disableCommentDelete = true;

      this.commentService
        .delete(comment.id, this.token)
        .subscribe({
          next: (response) => {
            this.disableCommentDelete = false;
            if (response.errors) {
              this.onErr(response.errors[0]);
            }
            this.getComments();
          },
          error: (err) => {
            this.disableCommentDelete = false;
            this.onErr(err);
          }
        })
    }
  }

  onErr(err: unknown) {
    const error: Error = err as Error;

    if (error['message'] && error['message'] === ERR.UNAUTHORIZED) {
      this.appStateService.resetUser();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    } else {
      throw new Error(error['message']);
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
