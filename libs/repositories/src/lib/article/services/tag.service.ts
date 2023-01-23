import { Injectable } from "@nestjs/common";
import { TagRepository } from "../tag.repository";

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository
  ) { }

  insertTags(tags: string) {
    const _tags = tags.trim().split(',');

    _tags.forEach(async (tag) => {
      const _tag = tag.trim().toLowerCase();

      if (_tag && _tag.length) {
        const existingEntry = await this.tagRepository.get(_tag);

        if (existingEntry) {
          this.tagRepository.update({
            name: _tag,
            count: existingEntry.count + 1
          })
        } else {
          this.tagRepository.create({
            name: _tag,
            count: 1
          });
        }
      }
    });
  }

  decrementTagsCount(tags) {
    tags.forEach(async (tag) => {
      const existingEntry = await this.tagRepository.get(tag);

      if (existingEntry?.count - 1 === 0) {
        this.remove(tag);
      } else {
        this.tagRepository.update({
          name: tag,
          count: existingEntry.count - 1
        });
      }
    });
  }

  incrementTagsCount(tags) {
    tags.forEach(async (tag) => {
      const existingEntry = await this.tagRepository.get(tag);

      if (existingEntry) {
        this.tagRepository.update({
          name: tag,
          count: existingEntry.count + 1
        });
      } else {
        this.insert({
          name: tag,
          count: 1
        });
      }
    });
  }

  compareAndActOnTags(newTags, oldTags) {
    const _newTags = newTags?.trim().length > 0 ? newTags?.split(',') : [];
    const _oldTags = oldTags?.trim().length > 0 ? oldTags?.split(',') : [];

    const tagsToIncrease = _oldTags.length === 0 ? _newTags : [];
    const tagsToDecrease = _newTags.length === 0 ? _oldTags : [];

    _newTags.forEach(newTag => {
      const isOldTag = _oldTags.find(oldTag => oldTag === newTag);

      if (!isOldTag) {
        tagsToIncrease.push(newTag);
      }
    });

    _oldTags.forEach(oldTag => {
      const isTagInNew = _newTags.find(newTag => newTag === oldTag);

      if (!isTagInNew) {
        tagsToDecrease.push(oldTag);
      }
    });

    this.incrementTagsCount(tagsToIncrease);
    this.decrementTagsCount(tagsToDecrease);
  }

  insert(tag) {
    this.tagRepository.create(tag);
  }

  remove(tag: string) {
    return this.tagRepository.remove(tag);
  }

  async getPopularTags() {
    let tags = await this.tagRepository.getAll();
    tags = tags.map(tag => ({ name: tag.name, count: tag.count }));
    const popularTags = tags.slice().sort((prev, next) => next.count - prev.count);

    return popularTags.slice(0, 10);
  }
}