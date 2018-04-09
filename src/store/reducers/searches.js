import {
    SEARCH_FETCH_START,
    SEARCH_FETCH_SUCCESS,
    SEARCH_FETCH_ERROR
} from '../constants/actions';

export default function items(state = {}, action) {
    switch (action.type) {
        case SEARCH_FETCH_START:
            return Object.assign({}, state, {
                [action.search]: {
                    fetching: true
                }
            });
        case SEARCH_FETCH_SUCCESS:
            return Object.assign({}, state, {
                [action.search]: action.items
            });
        case SEARCH_FETCH_ERROR:
            return Object.assign({}, state, {
                [action.search]: {
                    error: action.error
                }
            });
        default:
            return state;
    }
}
