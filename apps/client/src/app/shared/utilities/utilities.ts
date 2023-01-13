import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AppStateService } from "../../services/common/appStateService";
import { ERR } from "../constants/common";

@Injectable()
export class Utilities {

  constructor(
    private router: Router,
    private readonly appStateService: AppStateService,
  ) { }

  onErr(err: unknown) {
    const error: Error = err as Error;

    if (error['message'] && error['message'] === ERR.UNAUTHORIZED) {
      this.appStateService.resetUser();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    } else {
      throw new Error(error['message']);
    }
  }
}