import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return action.payload; //In other reducers we have more than one fields in our states.So we need to copy each element of state object(...state) and then we have to override the thing that we need to change only.

        // Here, as we have only one field in state,returning action.payload will do the work.which indeed will be changed in our root state/root store.
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}