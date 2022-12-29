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

export const FOLLOW = gql`
  mutation follow($follow: String!, $follower: String!, $token: String!) {
    follow (
      followArgs: {
        follow: $follow,
        follower: $follower,
        token: $token
      }
    )
  }
`;

export const UNFOLLOW = gql`
  mutation unfollow($follow: String!, $follower: String!, $token: String!) {
    unfollow (
      unfollowArgs: {
        follow: $follow,
        follower: $follower,
        token: $token
      }
    )
  }
`;
