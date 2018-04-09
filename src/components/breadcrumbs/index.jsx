import React from 'react';
import css from './styles.less';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { clearBreadcrumbs } from 'store/actions/breadcrumbs';

class Breadcrumbs extends React.PureComponent {

    render() {
        console.log('breadcrumbs', this.props);
        if (!this.props.breadcrumbs) {
            return null;
        }
        return (
            <nav className={ css.breadcrumbs }>
                {
                    this.props.breadcrumbs.map((breadcrumb, index) => {
                        return (
                            <React.Fragment>
                                {
                                    !!index && <span className={ css.separator } />
                                }
                                <span class={ css.breadcrumb }>{ breadcrumb }</span>
                            </React.Fragment>
                        );
                    })
                }
            </nav>
        );
    }

}

export default withRouter(connect(
    ({ breadcrumbs }, props) => {
        const { pathname, search } = props.location;
        const url = `${ pathname }${ search }`;

        return {
            breadcrumbs: breadcrumbs[url]
        };
    },
    dispatch => {
        return {
            clearBreadcrumbs: () => dispatch(clearBreadcrumbs())
        }
    }
)(Breadcrumbs));
