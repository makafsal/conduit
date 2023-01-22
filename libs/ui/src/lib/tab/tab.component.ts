import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { } from 'stream';
import { ITab } from '../models/ITab';

@Component({
  selector: 'conduit-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})

export class TabComponent implements OnChanges {

  @Input() tabs: ITab[] = [];
  @Input() maxTabs = 3;
  @Output() tabClick = new EventEmitter<ITab>();
  public currentTab = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabs']?.currentValue?.length > changes['tabs']?.previousValue?.length) {
      const newTab = changes['tabs'].currentValue.pop();
      const isFound = this.tabs.find(tab => tab.title === newTab.title);
      
      if (!isFound) {
        if(this.tabs.length < this.maxTabs) {
          this.tabs.push(newTab);
        } else {
          this.tabs.pop();
          this.tabs.push(newTab);
        }
      }
    }
    if (this.tabs?.length > 0) {
      this.currentTab = this.tabs[this.tabs.length - 1].title;
    }
  }

  tabChange(tab: ITab) {
    this.currentTab = tab.title;
    this.tabClick.emit(tab);
  }
}