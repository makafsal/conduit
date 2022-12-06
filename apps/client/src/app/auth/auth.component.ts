import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

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

      // this.authService.login()
      //   .subscribe(({ data }) => {
      //     console.log(data)
      //   });
    });
  }

  public onSubmit() {
    if (this.userEmail?.trim().length && this.userPassword?.trim().length) {
      this.authService
        .login(this.userEmail, this.userPassword)
        .subscribe(({ data }) => {
          console.log(data)
        });
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
