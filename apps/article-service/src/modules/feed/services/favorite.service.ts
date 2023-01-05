import { Injectable } from "@nestjs/common";
import { FavoriteRepository } from "../repositories/favorite.repository";

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository
  ) { }

  async create(payload) {
    await this.favoriteRepository.create(payload);

    return true;
  }

  async remove(payload) {
    await this.favoriteRepository.remove(payload);

    return true;
  }
}