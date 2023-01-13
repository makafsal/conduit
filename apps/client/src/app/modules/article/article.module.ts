import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { EditorComponent } from './components/editor/editor.component';
import { ArticleViewComponent } from './components/article-view/article-view.component';
import { RouterModule } from '@angular/router';
import { articleRoutes } from './article.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { CommentService } from '../../services/comment.service';
import { Utilities } from '../../shared/utilities/utilities';

@NgModule({
  declarations: [
    EditorComponent,
    ArticleViewComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(articleRoutes)
  ],
  providers: [
    ArticleService,
    DatePipe,
    CommentService,
    Utilities
  ]
})
export class ArticleModule { }
