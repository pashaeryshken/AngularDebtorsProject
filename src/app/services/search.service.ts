import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  public isSearch: boolean = false;
  public search: {searchStr?: string, filter?: string} = {
    searchStr: '',
    filter: 'all'
  };

  public set searchStr(searchStr: string) {
    this.search = {...this.search,
      searchStr: searchStr
    };
  }

  public get searchStr(): string {
    return this.search.searchStr;
  }

  public set searchFilter(isI: string) {
    this.search = {...this.search,
      filter: isI
    };
  }

}
