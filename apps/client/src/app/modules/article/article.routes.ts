import { Route } from '@angular/router';
import { ArticleViewComponent } from './components/article-view/article-view.component';
import { EditorComponent } from './components/editor/editor.component';

export const articleRoutes: Route[] = [
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'editor/:articleID',
    component: EditorComponent
  },
  {
    path: 'articles/:title',
    component: ArticleViewComponent
  }
];
