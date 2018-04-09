import { combineReducers } from 'redux';
import breadcrumbs from './breadcrumbs';
import items from './items';
import searches from './searches';

const reducers = combineReducers({
    breadcrumbs,
    items,
    searches
});

export default reducers;
