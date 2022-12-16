import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from '../../../services/common/appStateService';
import { IUser } from '../../model/IUser';

@Component({
  selector: 'conduit-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  public userInfo: IUser | undefined;
  private currentUserSubscription: Subscription = new Subscription();

  constructor(
    private appStateService: AppStateService
  ) { }

  ngOnInit(): void {
    this.appStateService.getCurrentUser();
    this.currentUserSubscription = this.appStateService.currentUserData$.subscribe((user) => {
      this.userInfo = user;
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
