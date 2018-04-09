import {
    SEARCH_FETCH_START,
    SEARCH_FETCH_SUCCESS,
    SEARCH_FETCH_ERROR
} from '../constants/actions';
import { addBreadcrumbs } from './breadcrumbs';
import { get } from 'axios';

function searchFetchStart(search) {
    return {
        type: SEARCH_FETCH_START,
        search
    }
}

function searchFetchSuccess(search, items) {
    return {
        type: SEARCH_FETCH_SUCCESS,
        search,
        items
    }
}

function searchFetchError(search, error) {
    return {
        type: SEARCH_FETCH_ERROR,
        search,
        error
    }
}

function search(value) {
    return function (dispatch, getState) {
        dispatch(searchFetchStart(value));
        get(`/api/items?q=${ value }`).then(response => {
            dispatch(searchFetchSuccess(value, response.data.items));
            dispatch(addBreadcrumbs(`/items?search=${ value }`, response.data.categories));
        }).catch(error => {
            dispatch(searchFetchError(value, error.message));
        });
    }
}

export {
    search
};

export default {
    search
};
