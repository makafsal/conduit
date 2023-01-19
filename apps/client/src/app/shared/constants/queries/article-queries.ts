import { gql } from "apollo-angular";

export const CREATE_ARTICLE = gql`
  mutation createArticle($title: String!, $description: String!, $body: String!, $tags: String!, $slug: String!, $author: String!, $createdAt: String!, $updatedAt: String!, $token: String!) {
    createArticle (
      article: {
        title: $title,
        description: $description,
        body: $body,
        tags: $tags,
        slug: $slug,
        author: $author,
        createdAt: $createdAt,
        updatedAt: $updatedAt,
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
      favorited
      favoriteCount
    }
  }
`;

export const GET_ARTICLES = gql`
  query getAllArticles($currentUser: String!, $token: String!) {
    getAllArticles(
      payload: {
        currentUser: $currentUser, 
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
      createdAt
      updatedAt
      favorited
      favoriteCount
    }
  }
`;

export const GET_ARTICLES_BY_AUTHOR = gql`
  query getArticlesByAuthor($author: String!, $currentUser: String!, $token: String!) {
    getArticlesByAuthor(
      payload: {
        author: $author,
        currentUser: $currentUser, 
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
      createdAt
      updatedAt
      favorited
      favoriteCount
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($articleID: String!, $articleTitle: String!, $token: String!) {
    deleteArticle (
      payload: {
        id: $articleID,
        title: $articleTitle
        token: $token
      }
    )
  }
`;