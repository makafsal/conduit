import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AppStateService } from '../services/common/appStateService';

@Component({
  selector: 'conduit-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit, OnDestroy {
  public pageType = '';
  public title = '';
  public submitText = '';
  public switchQuestion = '';
  public userEmail = '';
  public userPassword = '';
  public authErr = '';

  private routeSubscription: Subscription = new Subscription();
  // private getUserSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.url.subscribe(urlSegment => {
      this.pageType = urlSegment[urlSegment.length - 1].path;
      this.title, this.submitText = this.pageType;
      this.switchQuestion = this.pageType === 'login' ? 'Need an account?' : 'Have an account?';
    });
  }

  public onSubmit() {
    if (this.userEmail?.trim().length && this.userPassword?.trim().length) {
      this.authService
        .login(this.userEmail, this.userPassword)
        .subscribe((response) => {
          if (response.errors) {
            this.authErr = response.errors[0].message;
          }

          if (response.data) {
            console.log(response.data)
            this.authErr = '';
            const data = response.data;
            const dataObj = Object(data);
            const access_token = dataObj.loginUser.token;
            AppStateService.setUserToken(access_token);
            const userInfo = {
              email: dataObj.loginUser.email,
              username: dataObj.loginUser.username
            };
            AppStateService.setUserInfo(JSON.stringify(userInfo));
            console.log(AppStateService.getUserInfo())
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}

export interface IData {
  loginUser: any;
}
