import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { URLs } from "../shared/constants/common";
import { UPDATE_USER } from "../shared/constants/queries/user-queries";
import { IUser } from "../shared/model/IUser";

@Injectable()
export class UserService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  updateUser(user: IUser, token: string) {
    return this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        ...user,
        image: user.image || URLs.PROFILE_IMAGE,
        token
      }
    });
  }
}