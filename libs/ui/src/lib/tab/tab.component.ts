import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ITab } from './models/ITab';

@Component({
  selector: 'conduit-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})

export class TabComponent implements OnChanges {

  @Input() tabs: ITab[] = [];
  @Input() maxTabs = 3;
  @Output() tabClick = new EventEmitter<ITab>();
  public currentTabTitle = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabs']?.currentValue?.length > changes['tabs']?.previousValue?.length) {
      const newTab = changes['tabs'].currentValue.pop();
      const isFound = this.tabs.find(tab => tab.title === newTab.title);

      if (!isFound) {
        if (this.tabs.length >= this.maxTabs) {
          this.tabs.pop();
        }

        this.tabs.push(newTab);
      }
    }
    if (this.tabs?.length > 0) {
      this.currentTabTitle = this.tabs[this.tabs.length - 1].title;
    }

    this.tabClick.emit(this.tabs[this.tabs.length - 1]);
  }

  tabChange(tab: ITab) {
    this.currentTabTitle = tab.title;
    this.tabClick.emit(tab);
  }
}
