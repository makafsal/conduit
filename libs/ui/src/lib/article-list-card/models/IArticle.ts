import { IAuthor } from "./IAuthor";

export interface IArticle {
  id?: string;
  title: string;
  description: string;
  body: string;
  tags: string;
  slug: string;
  author: IAuthor;
  createdAt?: string;
  updatedAt: string;
  favoriteCount: number;
  favorited: boolean;
}