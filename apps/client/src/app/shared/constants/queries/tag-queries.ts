import { gql } from 'apollo-angular';

export const GET_POPULAR_TAGS = gql`
  query getPopularTags($token: String!) {
    getPopularTags(
      payload: {
        token: $token
      }
    ) {
      name
      count
    }
  }
`;