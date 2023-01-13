import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { homeRoutes } from './home.routes';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { TagService } from '../../services/tag.service';

@NgModule({
  declarations: [
    HomeComponent,
    PopularTagsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  providers: [
    TagService
  ]
})
export class HomeModule {}
