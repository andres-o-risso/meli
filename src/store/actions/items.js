import {
    ITEM_FETCH_START,
    ITEM_FETCH_SUCCESS,
    ITEM_FETCH_ERROR
} from '../constants/actions';
import { addBreadcrumbs } from './breadcrumbs';
import { get } from 'axios';

function itemFetchStart(id) {
    return {
        type: ITEM_FETCH_START,
        id
    }
}

function itemFetchSuccess(id, item) {
    return {
        type: ITEM_FETCH_SUCCESS,
        id,
        item
    }
}

function itemFetchError(id, error) {
    return {
        type: ITEM_FETCH_ERROR,
        id,
        error
    }
}

function getItem(id) {
    return function (dispatch, getState) {
        dispatch(itemFetchStart(id));
        get(`/api/items/${ id }`).then(response => {
            dispatch(itemFetchSuccess(id, response.data.item));
            dispatch(addBreadcrumbs(`/items/${ id }`, response.data.categories));
        }).catch(error => {
            dispatch(itemFetchError(id, error.message));
        });
    }
}

export {
    getItem
};

export default {
    getItem
};
