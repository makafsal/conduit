import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { GET_POPULAR_TAGS } from "../shared/constants/queries/tag-queries";
import { AppStateService } from "./common/appStateService";

@Injectable()
export class TagService {

  constructor(
    private readonly apollo: Apollo
  ) { }

  getPopularTags() {
    const token = AppStateService.getUserTokenStatic();

    return this.apollo.watchQuery({
      query: GET_POPULAR_TAGS,
      variables: {
        token
      }
    }).valueChanges;
  }
}