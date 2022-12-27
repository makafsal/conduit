import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { PROFILE_GET } from "../shared/constants/profile-queries";

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
      }
    }).valueChanges;
  }

}