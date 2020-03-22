import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {DebtorsResponse} from '../interfaces';

@Pipe({
  name: 'searchDebtors'
})
export class SearchPipe implements PipeTransform {
  transform(debtors: DebtorsResponse[], search = ''): DebtorsResponse[] {
    if (!search.trim()) {
      return debtors;
    }

    return debtors.filter(debtor => {
      return debtor.name.toLowerCase().includes(search.trim().toLowerCase());
    });
  }
}
