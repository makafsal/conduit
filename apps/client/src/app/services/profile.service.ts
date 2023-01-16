import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { FOLLOW, PROFILE_GET, UNFOLLOW } from "../shared/constants/queries/profile-queries";

@Injectable()
export class ProfileService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getProfile(profileName: string, currentUserEmail: string, token: string) {
    return this.apollo.watchQuery({
      query: PROFILE_GET,
      variables: {
        username: profileName,
        currentUserEmail,
        token
      },
      fetchPolicy: 'network-only'
    }).valueChanges;
  }

  follow(follow: string, follower: string, token: string) {
    return this.apollo.mutate({
      mutation: FOLLOW,
      variables: {
        follow,
        follower,
        token
      }
    });
  }

  unfollow(follow: string, follower: string, token: string) {
    return this.apollo.mutate({
      mutation: UNFOLLOW,
      variables: {
        follow,
        follower,
        token
      }
    });
  }

}