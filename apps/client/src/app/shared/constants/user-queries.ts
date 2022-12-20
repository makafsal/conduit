import { gql } from 'apollo-angular';

export const UPDATE_USER = gql`
  mutation updateUser($email: String!, $username: String!, $password: String!, $image: String!, $bio: String, $token: String!) {
    updateUser (
      user: {
        email: $email,
        username: $username,
        password: $password,
        image: $image,
        bio: $bio,
        token: $token
      }
    ) {
      email
      username
      bio
      image
    }
  }
`;