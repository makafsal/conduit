import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { CREATE_ARTICLE } from "../shared/constants/article-queries";
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
}