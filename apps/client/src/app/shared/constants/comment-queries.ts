import { gql } from "apollo-angular";

export const CREATE_COMMENT = gql`
  mutation createComment($article: String!, $author: String!, $body: String!, $created_at: String!, $token: String!) {
    createComment(
      comment: {
        article: $article,
        author: $author,
        body: $body,
        created_at: $created_at,
        token: $token
      }
    )
  }
`;

export const GET_COMMENTS_BY_ARTICLE = gql`
  query getCommentsByArticle($articleID: String!, $token: String!) {
    getCommentsByArticle(
      payload: {
        articleID: $articleID,
        token: $token
      }
    ) {
      id
      body
      article
      author {
        username
        email
        image
        bio
      }
      created_at
    }
  }
`;