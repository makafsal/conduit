import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routes';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { TagService } from '../../services/tag.service';
import { FeedTabComponent } from './components/feed-tab/feed-tab.component';

@NgModule({
  declarations: [
    HomeComponent,
    PopularTagsComponent,
    FeedTabComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(homeRoutes)],
  providers: [TagService],
})
export class HomeModule {}
