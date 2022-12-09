import { Injectable } from "@angular/core";
import { AppConstants } from "../../shared/constants/app-constants";
import { SLSService } from "./secureLocalStorageService";

@Injectable()
export class AppStateService {

  static setUserToken(token: string) {
    SLSService.setKeyValue(AppConstants.AUTH_TOKEN_KEY, token);
  }

  static getUserToken() {
    return SLSService.getValueByKey(AppConstants.AUTH_TOKEN_KEY);
  }

  static setUserInfo(userInfo: string) {
    SLSService.setKeyValue(AppConstants.USER_INFO_KEY, userInfo);
  }

  static getUserInfo() {
    return SLSService.getValueByKey(AppConstants.USER_INFO_KEY);
  }
}