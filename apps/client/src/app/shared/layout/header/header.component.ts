import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from '../../../services/common/appStateService';

@Component({
  selector: 'conduit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  public userInfo: IUserInfo | undefined;
  public userImage = '';
  private userInfoSubscription: Subscription = new Subscription();

  constructor(
    private appStateService: AppStateService
  ) { }

  ngOnInit(): void {
    this.userInfoSubscription = this.appStateService.userInfoData$.subscribe((user) => {
      this.userInfo = JSON.parse(user);
      this.userImage = this.userInfo?.image || 'https://api.realworld.io/images/smiley-cyrus.jpeg';
    });
  }

  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }
}

export interface IUserInfo {
  username: string;
  email: string;
  bio?: string;
  image?: string;
}
