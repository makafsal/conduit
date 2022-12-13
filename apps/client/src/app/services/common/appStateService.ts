import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AppConstants } from "../../shared/constants/app-constants";
import { SLSService } from "./secureLocalStorageService";

@Injectable()
export class AppStateService {
  private userTokenDataSource = new BehaviorSubject<string>(this.getUserToken());
  public userTokenData$ = this.userTokenDataSource.asObservable();

  private userInfoDataSource = new BehaviorSubject(this.getUserInfo());
  public userInfoData$ = this.userInfoDataSource.asObservable();

  static getUserTokenStatic() {
    return SLSService.getValueByKey(AppConstants.AUTH_TOKEN_KEY);
  }

  public setUserToken(token: string) {
    SLSService.setKeyValue(AppConstants.AUTH_TOKEN_KEY, token);
    this.userTokenDataSource.next(this.getUserToken());
  }

  public resetUser() {
    SLSService.removeKey(AppConstants.AUTH_TOKEN_KEY);
    SLSService.removeKey(AppConstants.USER_INFO_KEY);
  }

  public getUserToken() {
    return SLSService.getValueByKey(AppConstants.AUTH_TOKEN_KEY);
  }


  public setUserInfo(userInfo: string) {
    SLSService.setKeyValue(AppConstants.USER_INFO_KEY, userInfo);
    this.userInfoDataSource.next(this.getUserInfo());
  }

  public getUserInfo() {
    return SLSService.getValueByKey(AppConstants.USER_INFO_KEY);
  }
}