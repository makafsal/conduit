import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import {
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  GET_ARTICLES,
  GET_ARTICLES_BY_AUTHOR,
  GET_ARTICLE_BY_ID
} from "../shared/constants/queries/article-queries";
import { IArticle } from "../shared/model/IArticle";

@Injectable()
export class ArticleService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  create(article: IArticle) {
    return this.apollo.mutate({
      mutation: CREATE_ARTICLE,
      variables: article
    });
  }

  getByID(articleID: string, currentUser: string, token: string) {
    return this.apollo.query({
      query: GET_ARTICLE_BY_ID,
      variables: {
        articleID,
        currentUser,
        token
      }
    });
  }

  getAll(currentUser: string, token: string) {
    return this.apollo.query({
      query: GET_ARTICLES,
      variables: {
        currentUser,
        token
      }
    });
  }

  getByAuthor(author: string, currentUser: string, token: string) {
    return this.apollo.query({
      query: GET_ARTICLES_BY_AUTHOR,
      variables: {
        author,
        currentUser,
        token
      }
    });
  }

  delete(articleID: string, articleTitle: string, token: string) {
    return this.apollo.mutate({
      mutation: DELETE_ARTICLE,
      variables: {
        articleID,
        articleTitle,
        token
      }
    });
  }
}