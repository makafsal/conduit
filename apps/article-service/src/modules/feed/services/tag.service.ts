import { Injectable } from "@nestjs/common";
import { TagRepository } from "../repositories/tag.repository";

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository
  ) { }

  insertTags(tags) {
    const _tags = tags.split(',');

    _tags.forEach(async (tag) => {
      const existingEntry = await this.tagRepository.get(tag);

      if (existingEntry) {
        this.tagRepository.update({
          name: tag,
          count: existingEntry.count + 1
        })
      } else {
        this.tagRepository.create({
          name: tag,
          count: 1
        });
      }
    });
  }
}