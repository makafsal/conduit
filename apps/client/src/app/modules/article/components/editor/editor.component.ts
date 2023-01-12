import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppStateService } from '../../../../services/common/appStateService';
import { Subscription } from 'rxjs';
import { IUser } from '../../../../shared/model/IUser';
import { ArticleService } from '../../../../services/article.service';
import { IArticle } from '../../../../shared/model/IArticle';
import { ERR } from '../../../../shared/constants/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'conduit-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  public articleForm: FormGroup;
  public formDirty = false;
  public articleSaveErr = '';
  private routeSubscription: Subscription = new Subscription();
  private articleID!: string;
  private currentUserSubscription: Subscription = new Subscription();
  private currentUser!: IUser;

  constructor(
    private router: Router,
    private readonly appStateService: AppStateService,
    private readonly formBuilder: FormBuilder,
    private readonly articleService: ArticleService,
    private route: ActivatedRoute
  ) {
    this.articleForm = this.formBuilder.group({
      title: '',
      description: '',
      body: '',
      tags: ''
    });
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.appStateService
      .currentUserData$
      .subscribe(user => {
        this.currentUser = {
          username: user?.username || '',
          email: user?.email || '',
          bio: user?.bio || '',
          image: user?.image || '',
        }
      });

    this.routeSubscription = this.route.url.subscribe(urlSegment => {
      this.articleID = urlSegment[1]?.path;

      if (this.articleID?.length) {
        this.patchForm();
      }
    });

    this.articleForm.valueChanges.subscribe(newValues => {
      if (
        newValues.title !== '' &&
        newValues.description !== '' &&
        newValues.body !== '' &&
        newValues.tags !== ''
      ) {
        this.formDirty = true;
      } else {
        this.formDirty = false;
      }
    })
  }

  patchForm() {
    this.articleService
      .getByID(this.articleID, this.currentUser.email, AppStateService.getUserTokenStatic())
      .subscribe({
        next: (response) => {
          if (response.errors) {
            this.onErr(response.errors[0]);
          }

          if (response.data) {
            const data = response.data;
            const article = Object(data).getArticleByID as IArticle;
            this.articleForm.patchValue({
              ...article
            });
          }
        },
        error: (err) => {
          this.onErr(err);
        }
      });
  }

  onSubmit() {
    this.formDirty = true;

    const slug = this.articleForm.value.title.trim().replaceAll(' ', '-');
    const article: IArticle = {
      ...this.articleForm.value,
      slug,
      title: this.articleForm.value.title.trim(),
      author: this.currentUser.email,
      createdAt: new Date().toISOString(),
      updatedAt: '',
      token: AppStateService.getUserTokenStatic()
    };

    this.articleService
      .create(article)
      .subscribe({
        next: (response) => {
          if (response.errors) {
            this.onErr(response.errors[0]);
          }

          if (response.data) {
            const data = response.data;
            const newArticle: IArticle = Object(data).createArticle as IArticle;

            this.router.navigate([`/article/${newArticle.slug}`]);
          }
        },
        error: (err) => {
          this.onErr(err);
        }
      });
  }

  onErr(err: unknown) {
    const error: Error = err as Error;

    this.formDirty = false;
    this.articleSaveErr = error['message'] || ERR.UNEXPECTED;

    if (error['message'] && error['message'] === ERR.UNAUTHORIZED) {
      this.appStateService.resetUser();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
