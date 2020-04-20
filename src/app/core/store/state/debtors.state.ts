import {DebtorsResponse} from '../../../shared/interfaces';

export interface DebtorsState {
  debtors: DebtorsResponse[];
  debtorsLoading: boolean;
<<<<<<< HEAD
<<<<<<< HEAD
=======
  debtorUpdate: boolean;
>>>>>>> Revert "finaly commit"
=======
  debtorUpdate: boolean;
=======
>>>>>>> master
>>>>>>> 96afeac285079c809edf307dc86a1d169306c273
}

export const initialDebtorState: DebtorsState = {
  debtors: [],
  debtorsLoading: false,
<<<<<<< HEAD
<<<<<<< HEAD
=======
  debtorUpdate: false
>>>>>>> Revert "finaly commit"
=======
  debtorUpdate: false
=======
>>>>>>> master
>>>>>>> 96afeac285079c809edf307dc86a1d169306c273
};
