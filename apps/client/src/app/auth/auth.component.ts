import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'conduit-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public pageType: string = '';
  public title: string = '';
  public submitText: string = '';
  public switchQuestion: string = '';

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.url.subscribe(urlSegment => {
      this.pageType = urlSegment[urlSegment.length - 1].path;
      this.title, this.submitText = this.pageType;
      this.switchQuestion = this.pageType === 'login' ? 'Need an account?' : 'Have an account?'
    });
  }
}
