import { Injectable } from "@nestjs/common";
import { FavoriteRepository } from "../favorite.repository";

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository
  ) { }

  getAll() {
    return this.favoriteRepository.getAll();
  }

  getByFavoritedUser(user: string) {
    return this.favoriteRepository.getByFavoritedBy(user);
  }

  async create(payload) {
    await this.favoriteRepository.create(payload);

    return true;
  }

  async remove(payload) {
    await this.favoriteRepository.remove(payload);

    return true;
  }
}