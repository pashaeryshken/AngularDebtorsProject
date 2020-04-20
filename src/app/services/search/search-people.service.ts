import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchPeopleService {
  public isSearch: boolean = false;
  public search: {searchStr?: string} = {
    searchStr: ''
  };

  public set searchStr(searchStr: string) {
    this.search = {...this.search,
      searchStr: searchStr
    };
  }

  public get searchStr(): string {
    return this.search.searchStr;
  }

}
