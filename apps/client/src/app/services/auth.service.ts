import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../shared/constants/auth-queries';

@Injectable()
export class AuthService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  login(email: string, password: string) {
    return this.apollo.watchQuery({
      query: LOGIN,
      variables: {
        email: email,
        password: password
      }
    }).valueChanges;
  }

  // testFun() {
  //   this.login();
  //   console.log('test-fun called')
  //   return this.apollo.watchQuery({
  //     query: GET_USERS
  //   }).valueChanges;
  // }
}
