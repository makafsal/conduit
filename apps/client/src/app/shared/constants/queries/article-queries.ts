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

export const UPDATE_ARTICLE = gql`
  mutation update($id: String!, $title: String!, $description: String!, $body: String!, $tags: String!, $slug: String!, $author: String!, $updatedAt: String!, $token: String!) {
    updateArticle (
      article: {
        id: $id,
        title: $title,
        description: $description,
        body: $body,
        tags: $tags,
        slug: $slug,
        author: $author,
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
        following
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
        following
      }
      createdAt
      updatedAt
      favorited
      favoriteCount
    }
  }
`;

export const GET_ARTICLES_BY_TAG = gql`
  query getArticlesByTag($tag: String!, $currentUser: String!, $token: String!) {
    getArticlesByTag(
      payload: {
        tag: $tag,
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
        following
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
        following
      }
      createdAt
      updatedAt
      favorited
      favoriteCount
    }
  }
`;

export const GET_FAVORITED_ARTICLES = gql`
  query getFavoritedArticles($favoritedUser: String!, $currentUser: String!, $token: String!) {
    getFavoritedArticles(
      payload: {
        favoritedUser: $favoritedUser,
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
        following
      }
      createdAt
      updatedAt
      favorited
      favoriteCount
    }
  }
`;

export const FAVORITE_ARTICLE = gql`
  mutation favoriteArticle($article: String!, $favorited_by: String!, $token: String!) {
    favoriteArticle (
      favoriteArgs: {
        article: $article,
        favorited_by: $favorited_by
        token: $token
      }
    )
  }
`;

export const UNFAVORITE_ARTICLE = gql`
  mutation unfavoriteArticle($article: String!, $favorited_by: String!, $token: String!) {
    unfavoriteArticle (
      unfavoriteArgs: {
        article: $article,
        favorited_by: $favorited_by
        token: $token
      }
    )
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