import {Pipe, PipeTransform} from '@angular/core';
import {DebtorsResponse} from '../interfaces';

@Pipe({
  name: 'searchDebtors'
})
export class SearchPipe implements PipeTransform {

  public debtors: DebtorsResponse[];

  public transform(debtors: DebtorsResponse[],
                   search: { searchStr?: string, filter?: string }): DebtorsResponse[] {

    if (search.filter !== 'all') {
      debtors = debtors.filter((debtor) => {
        return debtor.isI === (search.filter === 'true');
      });
    }

    if (search.searchStr.trim() !== '') {
      debtors = debtors.filter((debtor) => {
        return debtor.people.name.trim().toLowerCase().includes(search.searchStr.toLowerCase().trim());
      });
    }

    return debtors.slice()
      .sort((a, b) => {
        return  b.status - a.status;
      })
      .reverse();
  }
}
