import {
    ITEM_FETCH_START,
    ITEM_FETCH_SUCCESS,
    ITEM_FETCH_ERROR
} from '../constants/actions';

export default function items(state = {}, action) {
    switch (action.type) {
        case ITEM_FETCH_START:
            return Object.assign({}, state, {
                [action.id]: {
                    fetching: true
                }
            });
        case ITEM_FETCH_SUCCESS:
            return Object.assign({}, state, {
                [action.id]: action.item
            });
        case ITEM_FETCH_ERROR:
            return Object.assign({}, state, {
                [action.id]: {
                    error: action.error
                }
            });
        default:
            return state;
    }
}
