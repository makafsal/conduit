import { gql } from "apollo-angular";

export const CREATE_ARTICLE = gql`
  mutation createArticle($title: String!, $description: String!, $body: String!, $tags: String!, $slug: String!, $author: String!, $created_at: String!, $updated_at: String!, $token: String!) {
    createArticle (
      article: {
        title: $title,
        description: $description,
        body: $body,
        tags: $tags,
        slug: $slug,
        author: $author,
        created_at: $created_at,
        updated_at: $updated_at,
        token: $token
      }
    ) {
      id
      title
      description
      body
      tags
      slug
      author {
        email
        username
        bio
        image
      }
      created_at
      updated_at
    }
  }
`;

export const GET_ARTICLE_BY_ID = gql`
  query getArticleByID($articleID: String!, $currentUser: String!, $token: String!) {
    getArticleByID(
      payload: {
        articleID: $articleID,
        currentUser: $currentUser
        token: $token
      }
    ) {
      id
      title
      description
      body
      tags
      slug
      author {
        email
        username
        bio
        image
      }
      created_at
      updated_at
      favorited
      favoriteCount
    }
  }
`;