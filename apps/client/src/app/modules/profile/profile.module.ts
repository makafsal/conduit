import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { profileRoutes } from './profile.routes';
import { ProfileService } from '../../services/profile.service';
import { UiModule } from '@conduit/ui';
import { ArticlesTabComponent } from './components/articles-tab/articles-tab.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ArticlesTabComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild(profileRoutes)
  ],
  providers: [ProfileService],
  exports: [RouterModule],
})
export class ProfileModule { }
