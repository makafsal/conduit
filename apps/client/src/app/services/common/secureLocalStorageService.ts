import { Injectable } from "@angular/core";
import * as SecureLS from 'secure-ls'
import { AppConstants } from "../../shared/constants/app-constants";

@Injectable()
export class SLSService {
  static setKeyValue(key: string, value: string) {
    const secureLS = new SecureLS({
      encodingType: 'aes',
      encryptionSecret: AppConstants.SECRET_KEY,
      isCompression: true
    });

    secureLS.set(key, value);
  }

  static getValueByKey(key: string) {
    const secureLS = new SecureLS({
      encodingType: 'aes',
      encryptionSecret: AppConstants.SECRET_KEY,
      isCompression: true
    });
    
    return secureLS.get(key);
  }
}