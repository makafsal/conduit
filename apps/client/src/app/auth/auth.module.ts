import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(authRoutes),
  ],
  exports: [RouterModule]
})
export class AuthModule { }
