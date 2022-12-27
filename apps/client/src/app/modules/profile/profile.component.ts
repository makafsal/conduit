import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AppStateService } from '../../services/common/appStateService';
import { ProfileService } from '../../services/profile.service';
import { ERR } from '../../shared/constants/common';
import { IProfile } from '../../shared/model/IProfile';

@Component({
  selector: 'conduit-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  public profile!: IProfile;
  private profileUsername = '';
  private routeSubscription: Subscription = new Subscription();
  private profileServiceSubscription: Subscription = new Subscription();

  constructor(
    private readonly profileService: ProfileService,
    private appStateService: AppStateService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.routeSubscription = this.route.url.subscribe(urlSegment => {
      this.profileUsername = urlSegment[urlSegment.length - 1].path;
    });

    this.getProfile();
  }

  getProfile() {
    const currentUser = AppStateService.getCurrentUserStatic();
    this.profileServiceSubscription = this.profileService
      .getProfile(this.profileUsername, currentUser?.email, AppStateService.getUserTokenStatic())
      .subscribe({
        next: (response) => {
          const dataObj = Object(response.data);
          this.profile = {
            ...dataObj.getProfile
          } as IProfile;

          console.log(this.profile)
        },
        error: (err) => {
          this.onErr(err);
        },
      });
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
