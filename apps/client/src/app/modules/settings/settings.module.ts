import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { RouterModule } from '@angular/router';
import { settingsRoutes } from './settings.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(settingsRoutes)
  ],
  exports: [RouterModule],
  providers: [UserService]
})
export class SettingsModule { }
