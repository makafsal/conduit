import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TabComponent } from './tab/tab.component';
import { ArticleListCardComponent } from './article-list-card/article-list-card.component';

@NgModule({
  imports: [
    CommonModule,
    DatePipe
  ],
  declarations: [
    TabComponent,
    ArticleListCardComponent
  ],
  exports: [
    TabComponent,
    ArticleListCardComponent
  ],
})
export class UiModule { }
