import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppStateService } from '../../../../services/common/appStateService';
import { Subscription } from 'rxjs';
import { IUser } from '../../../../shared/model/IUser';
import { ArticleService } from '../../../../services/article.service';
import { IArticle } from '../../../../shared/model/IArticle';
import { ERR } from '../../../../shared/constants/common';
import { Router } from '@angular/router';

@Component({
  selector: 'conduit-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  public articleForm: FormGroup;
  public formDirty = false;
  public articleSaveErr = '';

  private currentUserSubscription: Subscription = new Subscription();
  private userInfo!: IUser;

  constructor(
    private router: Router,
    private readonly appStateService: AppStateService,
    private readonly formBuilder: FormBuilder,
    private readonly articleService: ArticleService
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
        this.userInfo = {
          username: user?.username || '',
          email: user?.email || '',
          bio: user?.bio || '',
          image: user?.image || '',
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

  onSubmit() {
    this.formDirty = true;

    const slug = this.articleForm.value.title.trim().replaceAll(' ', '-');
    const article: IArticle = {
      ...this.articleForm.value,
      slug,
      title: this.articleForm.value.title.trim(),
      author: this.userInfo.email,
      created_at: new Date().toISOString(),
      updated_at: '',
      token: AppStateService.getUserTokenStatic()
    }

    this.articleService
      .create(article)
      .subscribe({
        next: (response) => {
          if (response.errors) {
            this.onErr(response.errors[0]);
          }

          if (response.data) {
            const data = response.data;
            const dataObj = Object(data);
            const slug = dataObj.createArticle.slug;
            
            this.router.navigate([slug]);
          }
        },
        error: (err) => {
          this.onErr(err)
        }
      });
  }

  onErr(err) {
    this.formDirty = false;
    this.articleSaveErr = err['message'] || ERR.UNEXPECTED;

    if (err['message'] && err['message'] === ERR.UNAUTHORIZED) {
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
