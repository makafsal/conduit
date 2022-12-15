import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStateService } from '../../services/common/appStateService';
import { UserService } from '../../services/user.service';
import { IUser } from '../../shared/model/IUser';

@Component({
  selector: 'conduit-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public userInfo: IUser | undefined;
  private currentUserSubscription: Subscription = new Subscription();

  public settingsForm: FormGroup;

  constructor(
    private appStateService: AppStateService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.settingsForm = this.formBuilder.group({
      image: [''],
      username: [''],
      bio: [''],
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.appStateService
      .currentUserData$
      .subscribe((user) => {
        this.userInfo = user;
        this.settingsForm.patchValue({ ...this.userInfo });
      });
  }

  onSubmit() {
    console.log(this.settingsForm.value)
    this.userService
      .updateUser(this.settingsForm.value, AppStateService.getUserTokenStatic())
      .subscribe((response) => {
        // TODO: Update latest data in local storage also
        console.log(response)
      })
  }

  logout() {
    this.appStateService.resetUser();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
