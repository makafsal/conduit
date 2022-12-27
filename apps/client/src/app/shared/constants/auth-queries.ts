import { gql } from 'apollo-angular';

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
      image
      bio
    }
  }
`;

export const REGISTER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!, $image: String!) {
    createUser(
      user: {
        username: $username,
        email: $email,
        password: $password,
        image: $image
      }
    ) {
      username
      email
      token
      bio
      image
    }
  }
`;
