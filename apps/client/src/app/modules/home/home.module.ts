import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routes';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { TagService } from '../../services/tag.service';
import { FeedTabComponent } from './components/feed-tab/feed-tab.component';
import { ArticleListingComponent } from './components/article-listing/article-listing.component';
import { ArticleService } from '../../services/article.service';

@NgModule({
  declarations: [
    HomeComponent,
    PopularTagsComponent,
    FeedTabComponent,
    ArticleListingComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(homeRoutes)],
  providers: [
    TagService,
    ArticleService,
    DatePipe
  ],
})
export class HomeModule { }
