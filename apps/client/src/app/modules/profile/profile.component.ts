import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  private profile: unknown;
  private routeSubscription: Subscription = new Subscription();
  private profileUsername = '';

  constructor(
    private readonly profileService: ProfileService,
    private appStateService: AppStateService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routeSubscription = this.route.url.subscribe(urlSegment => {
      this.profileUsername = urlSegment[urlSegment.length - 1].path;
    });

    const currentUser = AppStateService.getCurrentUserStatic();
    this.profileService
      .getProfile(this.profileUsername, currentUser?.email, AppStateService.getUserTokenStatic())
      .subscribe({
        next: (response) => {
          const data = response.data;
          const dataObj = Object(data);
          this.profile = {
            ...dataObj.getProfile
          };

          console.log(this.profile)
        },
        error: (err) => {
          if (err['message'] && err['message'] === ERR.UNAUTHORIZED) {
            this.appStateService.resetUser();
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1000);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
