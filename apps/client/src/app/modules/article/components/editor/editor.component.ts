import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppStateService } from '../../../../services/common/appStateService';
import { Subscription } from 'rxjs';
import { IUser } from '../../../../shared/model/IUser';

@Component({
  selector: 'conduit-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  public articleForm: FormGroup;
  public formDirty = false;

  private currentUserSubscription: Subscription = new Subscription();
  private userInfo!: IUser;

  constructor(
    private appStateService: AppStateService,
    private readonly formBuilder: FormBuilder
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
    const slug = this.articleForm.value.title.trim().replace(' ', '-');
    console.log(slug)
    console.log(this.userInfo.email)
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
