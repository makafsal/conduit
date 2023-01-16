import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { CREATE_COMMENT, DELETE_COMMENT, GET_COMMENTS_BY_ARTICLE } from "../shared/constants/queries/comment-queries";
import { IComment } from "../shared/model/IComment";

@Injectable()
export class CommentService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  create(comment: Omit<IComment, 'author'> & { author: string }, token: string) {
    return this.apollo.mutate({
      mutation: CREATE_COMMENT,
      variables: {
        article: comment.article,
        author: comment.author,
        body: comment.body,
        created_at: comment.created_at,
        token
      }
    });
  }

  getByArticle(articleID: string, token: string) {
    return this.apollo.query({
      query: GET_COMMENTS_BY_ARTICLE,
      variables: {
        articleID,
        token
      },
      fetchPolicy: 'network-only'
    });
  }

  delete(commentID: string, token: string) {
    return this.apollo.mutate({
      mutation: DELETE_COMMENT,
      variables: {
        commentID,
        token
      }
    });
  }
} 