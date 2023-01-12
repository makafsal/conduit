import { IAuthor } from "./IAuthor";

export interface IComment {
  id?: string;
  article: string;
  author: IAuthor;
  body: string;
  created_at: string;
}