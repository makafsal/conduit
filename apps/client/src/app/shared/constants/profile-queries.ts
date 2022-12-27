import { gql } from 'apollo-angular';

export const PROFILE_GET = gql`
  query profile($username: String!, $currentUserEmail: String!, $token: String!) {
    getProfile(
      profileArgs: {
        username: $username,
        currentUserEmail: $currentUserEmail,
        token: $token
      }
    ) {
      username
      bio
      image
      following
      email
    }
  }
`;