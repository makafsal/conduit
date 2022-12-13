import { Injectable } from "@angular/core";
import * as SecureLS from 'secure-ls'
import { AppConstants } from "../../shared/constants/app-constants";

const secureLS = new SecureLS({
  encodingType: 'aes',
  encryptionSecret: AppConstants.SECRET_KEY,
  isCompression: true
});

@Injectable()
export class SLSService {
  static setKeyValue(key: string, value: string) {
    secureLS.set(key, value);
  }

  static getValueByKey(key: string) {
    return secureLS.get(key);
  }

  static removeKey(key: string) {
    secureLS.remove(key);
  }
}