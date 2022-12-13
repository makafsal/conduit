import { Route } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  // }
];
