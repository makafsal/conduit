import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { profileRoutes } from './profile.routes';
import { ProfileService } from '../../services/profile.service';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes)
  ],
  providers: [
    ProfileService
  ],
  exports: [RouterModule],
})
export class ProfileModule { }
