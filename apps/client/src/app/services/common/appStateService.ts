import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AppConstants } from "../../shared/constants/app-constants";
import { IUser } from "../../shared/model/IUser";
import { SLSService } from "./secureLocalStorageService";

@Injectable()
export class AppStateService {
  private userTokenDataSource = new BehaviorSubject<string>(this.getUserToken());
  public userTokenData$ = this.userTokenDataSource.asObservable();

  private currentUserDataSource = new BehaviorSubject<IUser | undefined>(undefined);
  public currentUserData$ = this.currentUserDataSource.asObservable();

  static getUserTokenStatic() {
    return SLSService.getValueByKey(AppConstants.AUTH_TOKEN_KEY);
  }

  static getCurrentUserStatic() {
    const userInfo = SLSService.getValueByKey(AppConstants.USER_INFO_KEY);
    return userInfo && JSON.parse(userInfo);
  }

  public setUserToken(token: string) {
    SLSService.setKeyValue(AppConstants.AUTH_TOKEN_KEY, token);
    this.userTokenDataSource.next(this.getUserToken());
  }

  public resetUser() {
    SLSService.removeKey(AppConstants.AUTH_TOKEN_KEY);
    SLSService.removeKey(AppConstants.USER_INFO_KEY);
    this.userTokenDataSource.next('');
    this.currentUserDataSource.next(undefined);
  }

  public getUserToken() {
    return SLSService.getValueByKey(AppConstants.AUTH_TOKEN_KEY);
  }

  public getCurrentUser() {
    const userInfo = SLSService.getValueByKey(AppConstants.USER_INFO_KEY);
    this.currentUserDataSource.next(userInfo && JSON.parse(userInfo));
  }

  public setCurrentUser(user: IUser) {
    SLSService.setKeyValue(AppConstants.USER_INFO_KEY, JSON.stringify(user));
    this.currentUserDataSource.next(AppStateService.getCurrentUserStatic());
  }
}