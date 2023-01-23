import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppStateService } from '../../../../services/common/appStateService';
import { Subscription } from 'rxjs';
import { IUser } from '../../../../shared/model/IUser';
import { ArticleService } from '../../../../services/article.service';
import { IArticle } from '../../../../shared/model/IArticle';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilities } from '../../../../shared/utilities/utilities';

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
  public disableTitle = false;

  constructor(
    private router: Router,
    private readonly appStateService: AppStateService,
    private readonly formBuilder: FormBuilder,
    private readonly articleService: ArticleService,
    private route: ActivatedRoute,
    private readonly utilities: Utilities
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
        this.disableTitle = true;
        this.patchForm();
      } else {
        this.disableTitle = false;
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
            this.utilities.onErr(response.errors[0]);
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
          this.utilities.onErr(err);
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
      updatedAt: '',
      token: AppStateService.getUserTokenStatic()
    };

    if (this.articleID?.length) {
      article.id = this.articleID;
      article.updatedAt = new Date().toISOString();

      this.articleService
        .update(article)
        .subscribe({
          next: (response) => {
            this.formDirty = false;

            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }

            if (response.data) {
              const data = response.data;
              const newArticle: IArticle = Object(data).updateArticle as IArticle;

              this.router.navigate([`/articles/${newArticle.slug}`]);
            }
          },
          error: (err) => {
            this.formDirty = false;
            this.utilities.onErr(err);
          }
        })
    } else {
      article.createdAt = new Date().toISOString();

      this.articleService
        .create(article)
        .subscribe({
          next: (response) => {
            this.formDirty = false;

            if (response.errors) {
              this.utilities.onErr(response.errors[0]);
            }

            if (response.data) {
              const data = response.data;
              const newArticle: IArticle = Object(data).createArticle as IArticle;

              this.router.navigate([`/articles/${newArticle.slug}`]);
            }
          },
          error: (err) => {
            this.formDirty = false;
            this.utilities.onErr(err);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
