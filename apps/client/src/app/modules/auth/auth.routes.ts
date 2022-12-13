import { Route } from '@angular/router';
import { AuthComponent } from './auth.component';

export const authRoutes: Route[] = [
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'register',
    component: AuthComponent
  }
];
