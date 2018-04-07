import React from 'react';
import css from './styles.less';

export default class Breadcrumbs extends React.PureComponent {

    render() {
        return (
            <nav className={ css.breadcrumbs }>
                <a className={ css.link } href="#">link 1</a>
                <span className={ css.separator }>&gt;</span>
                <a className={ css.link } href="#">link 2</a>
                <span className={ css.separator }>&gt;</span>
                <a className={ css.link } href="#">link 3</a>
            </nav>
        );
    }

}
