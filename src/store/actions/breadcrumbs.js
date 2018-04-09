import {
    ADD_BREADCRUMBS
} from '../constants/actions';

function addBreadcrumbs(url, values) {
    return {
        type: ADD_BREADCRUMBS,
        url,
        values
    };
}

export {
    addBreadcrumbs
};

export default {
    addBreadcrumbs
};
