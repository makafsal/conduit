import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import {
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  FAVORITE_ARTICLE,
  GET_ARTICLES,
  GET_ARTICLES_BY_AUTHOR,
  GET_ARTICLES_BY_TAG,
  GET_ARTICLE_BY_ID,
  GET_FAVORITED_ARTICLES,
  UNFAVORITE_ARTICLE,
  UPDATE_ARTICLE
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

  update(article: IArticle) {
    return this.apollo.mutate({
      mutation: UPDATE_ARTICLE,
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
      },
      fetchPolicy: 'network-only'
    });
  }

  getAll(currentUser: string, token: string) {
    return this.apollo.query({
      query: GET_ARTICLES,
      variables: {
        currentUser,
        token
      },
      fetchPolicy: 'network-only'
    });
  }

  getByTag(tag: string, currentUser: string, token: string) {
    return this.apollo.query({
      query: GET_ARTICLES_BY_TAG,
      variables: {
        tag,
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
      },
      fetchPolicy: 'network-only'
    });
  }

  getFavorited(favoritedUser: string, currentUser: string, token: string) {
    return this.apollo.query({
      query: GET_FAVORITED_ARTICLES,
      variables: {
        favoritedUser,
        currentUser,
        token
      },
      fetchPolicy: 'network-only'
    });
  }

  favoriteArticle(article: string, favorited_by: string, token: string) {
    return this.apollo.mutate({
      mutation: FAVORITE_ARTICLE,
      variables: {
        article,
        favorited_by,
        token
      }
    });
  }

  unfavoriteArticle(article: string, favorited_by: string, token: string) {
    return this.apollo.mutate({
      mutation: UNFAVORITE_ARTICLE,
      variables: {
        article,
        favorited_by,
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