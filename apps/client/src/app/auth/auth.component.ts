import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'conduit-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {
  public pageType: string = '';
  public title: string = '';
  public submitText: string = '';
  public switchQuestion: string = '';

  // private getUserSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegment => {
      this.pageType = urlSegment[urlSegment.length - 1].path;
      this.title, this.submitText = this.pageType;
      this.switchQuestion = this.pageType === 'login' ? 'Need an account?' : 'Have an account?';

      this.authService.login()
        .subscribe(({ data }) => {
          console.log(data)
        });

      // this.authService.testFun().subscribe((data) => {
      //   console.log(data)
      // })
    });
  }
}
