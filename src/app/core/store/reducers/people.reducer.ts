import {ActionReducer} from '@ngrx/store';
import {initialPeopleState, PeopleState} from '../state/people.state';
import {PeopleAction, PeopleActionTypes} from '../actions/people.action';

export const peopleReducer: ActionReducer<PeopleState> =
  (state: PeopleState = initialPeopleState, action: PeopleAction): PeopleState => {
    switch (action.type) {
      case PeopleActionTypes.GET_PEOPLES : {
        return {...state, peopleLoading: true};
      }
      case PeopleActionTypes.SET_PEOPLES : {
        return {...state, peoples: action.peoples, peopleLoading: false};
      }
      case PeopleActionTypes.ADD_PEOPLE : {
        return {...state};
      }
      case PeopleActionTypes.SET_PEOPLE: {
        return {...state, peoples: [...state.peoples, action.people], newId: action.people._id};
      }
      case PeopleActionTypes.REMOVE_PEOPLE: {
        return {...state, peoples: [...state.peoples].filter( (people) => people._id === action.id)};
      }

      default: return state;

    }
  }
