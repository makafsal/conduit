import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppStateService } from '../../services/common/appStateService';
import { ProfileService } from '../../services/profile.service';
import { ERR } from '../../shared/constants/common';
import { IProfile } from '../../shared/model/IProfile';
import { IUser } from '../../shared/model/IUser';

@Component({
  selector: 'conduit-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public profile!: IProfile;
  private profileUsername = '';
  public currentUser!: IUser;
  private token = '';
  private routeSubscription: Subscription = new Subscription();
  private profileServiceSubscription: Subscription = new Subscription();

  constructor(
    private readonly profileService: ProfileService,
    private appStateService: AppStateService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.url.subscribe(urlSegment => {
      this.profileUsername = urlSegment[urlSegment.length - 1].path;
      this.init();
    });
  }

  init() {
    this.currentUser = AppStateService.getCurrentUserStatic();
    this.token = AppStateService.getUserTokenStatic();
    this.getProfile();
  }

  getProfile() {
    this.profileServiceSubscription = this.profileService
      .getProfile(this.profileUsername, this.currentUser?.email, this.token)
      .subscribe({
        next: (response) => {
          if (response?.errors) {
            this.onErr(response?.errors[0]);
          }

          if (response.data) {
            const dataObj = Object(response.data);
            this.profile = dataObj?.getProfile as IProfile;
          }
        },
        error: (err) => {
          this.onErr(err);
        },
      });
  }

  profileButtonClick() {
    if (this.profile.following) {
      this.unfollow();
    } else {
      this.follow();
    }
  }

  follow() {
    this.profileService.follow(
      this.profile.email,
      this.currentUser.email,
      this.token
    ).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.getProfile();
        }
      },
      error: (err) => {
        console.error(err);
        this.getProfile();
      }
    })
  }

  unfollow() {
    this.profileService.unfollow(
      this.profile.email,
      this.currentUser.email,
      this.token
    ).subscribe({
      next: (response) => {
        if (response && response.data) {
          this.getProfile();
        }
      },
      error: (err) => {
        console.error(err);
        this.getProfile();
      }
    })
  }

  onErr(err: any) {
    if (err['message'] && err['message'] === ERR.UNAUTHORIZED) {
      this.appStateService.resetUser();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.profileServiceSubscription.unsubscribe();
  }
}
