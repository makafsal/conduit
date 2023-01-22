import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TabComponent],
  exports: [TabComponent]
})
export class UiModule { }
