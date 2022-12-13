import { gql } from 'apollo-angular';

export const GET_USERS = gql`
  query getUsers {
    users {
        email
        username
      }
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    loginUser(
      user:{
        email: $email,
        password: $password
      }
    ) {
      email
      token
      username
    }
  }
`;

export const REGISTER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(
      user: {
        username: $username,
        email: $email,
        password: $password
      }
    ) {
      username
      email
      token
    }
  }
`;