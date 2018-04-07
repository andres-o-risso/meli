import React from 'react';
import css from './styles.less';
import Item from 'components/item';
import Items from 'components/items';
import Header from 'components/header';
import Breadcrumbs from 'components/breadcrumbs';
import { Route, Switch } from 'react-router-dom';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <div className={ css.wrapper }>
                    <Breadcrumbs />
                    <Switch>
                        <Route path="/items/:id" component={ Item } />
                        <Route path="/items" component={ Items } />
                    </Switch>
                </div>
            </div>
        );
    }

}
