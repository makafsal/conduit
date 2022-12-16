import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { AppStateService } from '../../services/common/appStateService';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(authRoutes),
  ],
  exports: [RouterModule],
  providers:[AppStateService]
})
export class AuthModule { }
