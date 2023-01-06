import { Route } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';

export const articleRoutes: Route[] = [
  {
    path: 'editor',
    component: EditorComponent
  }
];
