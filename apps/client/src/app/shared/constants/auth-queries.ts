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