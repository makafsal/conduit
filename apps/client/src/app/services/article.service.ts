import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { CREATE_ARTICLE, GET_ARTICLE_BY_ID } from "../shared/constants/article-queries";
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
}