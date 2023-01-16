import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN, REGISTER } from '../shared/constants/queries/auth-queries';
import { URLs } from '../shared/constants/common';

@Injectable()
export class AuthService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  register(username: string, email: string, password: string, image: string = URLs.PROFILE_IMAGE) {
    return this.apollo.mutate({
      mutation: REGISTER,
      variables: {
        username,
        email,
        password,
        image
      }
    });
  }

  login(email: string, password: string) {
    return this.apollo.watchQuery({
      query: LOGIN,
      variables: {
        email,
        password
      }
    }).valueChanges;
  }
}
