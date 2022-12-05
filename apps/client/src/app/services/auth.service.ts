import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { setContext } from '@apollo/client/link/context';
import { GET_USERS, LOGIN } from '../shared/constants/auth-queries';

@Injectable()
export class AuthService {
  // private readonly xyzDataSource = new BehaviorSubject<string>('');
  // public xyzData$ = this.xyzDataSource.asObservable();

  private querySub: Subscription | undefined;

  constructor(
    private readonly apollo: Apollo
  ) { }

  login() {
    return this.apollo.watchQuery<any>({
      query: LOGIN,
      variables: {
        email: 'mak@gm.com',
        password: 'mak123'
      }
    }).valueChanges;
  }

  testFun() {
    this.login();
    console.log('test-fun called')
    return this.apollo.watchQuery<any>({
      query: GET_USERS
    }).valueChanges;
  }

  ngOnDestroy() {
    console.log('Cleaning auth service');
    this.querySub?.unsubscribe();
  }
}
