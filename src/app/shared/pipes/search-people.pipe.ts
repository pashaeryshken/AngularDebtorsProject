import {Pipe, PipeTransform} from '@angular/core';
import {People} from '../interfaces';

@Pipe({
  name: 'searchPeople'
})
export class SearchPeoplePipe implements PipeTransform {

  public people: People[];

  public transform(people: People[],
                   search: { searchStr?: string }): People[] {

    if (search.searchStr.trim() !== '') {
      people = people.filter((person) => {
        return (person.name.trim().toLowerCase().includes(search.searchStr.toLowerCase().trim())
                || person.email.trim().toLowerCase().includes(search.searchStr.toLowerCase().trim())
              );
      });
    }

    return people;
  }
}
