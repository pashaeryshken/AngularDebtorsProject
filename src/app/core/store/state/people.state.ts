import {People} from '../../../shared/interfaces';

export interface PeopleState {
  peoples: People[];
  peopleLoading: boolean;
  newId: string;
}

export const initialPeopleState: PeopleState = {
  peoples: [],
  peopleLoading: false,
  newId: null
};
