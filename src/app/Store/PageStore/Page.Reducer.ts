import { PageActionTypes } from './Page.Actions';

//export let initialState = []
// const newState = (state, newData) => {
//
//     return Object.assign( state, newData);
// };
export const Pagereducer = (state = [], action) => {
  switch (action.type) {
    case 'OpenPage': {
      let Page = action.payload;
      //   if(Page.viewName=='BookingDetails')
      //   {

      //
      //   }

      return [
        ...state.filter((el) => el.viewName != Page.viewName),
        action.payload,
      ];
    }

    case 'LogOut': {
      let Page = action.payload;

      // state = undefined;

      return state.filter((el) => el.viewName != 'Login');
    }
    case 'ClosePage': {
      let viewName = action.payload;
      return state.filter((el) => el.viewName != viewName);
    }

    default:
      return state;
  }
};
