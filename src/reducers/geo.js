import * as types from '../constants';

const initialState = {
  geo: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SETGEO:
      return Object.assign({}, state, { geo: action.geo });
    default:
      return state;
  }
};