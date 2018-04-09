import {
    ADD_BREADCRUMBS
} from '../constants/actions';

const initialState = {
    '/': []
}

export default function breadcrumbs(state = initialState, action) {
    switch (action.type) {
        case ADD_BREADCRUMBS:
            return Object.assign({}, state, {
                [action.url]: action.values
            })
        default:
            return state;
    }
}
