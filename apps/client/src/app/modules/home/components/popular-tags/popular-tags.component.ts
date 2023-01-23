import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TagService } from '../../../../services/tag.service';
import { ITag } from '../../../../shared/model/ITag';
import { Utilities } from '../../../../shared/utilities/utilities';

@Component({
  selector: 'conduit-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
})
export class PopularTagsComponent implements OnInit {

  @Output() clickTag = new EventEmitter<ITag>();
  public tags: ITag[] = [];

  constructor(
    private readonly tagService: TagService,
    private readonly utilities: Utilities
  ) { }

  ngOnInit(): void {
    this.tagService
      .getPopularTags()
      .subscribe({
        next: (response) => {
          if (response.errors) {
            this.utilities.onErr(response.errors[0]);
          }

          if (response.data) {
            const data = response.data;
            this.tags = Object(data).getPopularTags as ITag[];
          }
        },
        error: (err) => {
          this.utilities.onErr(err);
        }
      });
  }

  tagClick(tag: ITag) {
    this.clickTag.emit(tag);
  }
}
