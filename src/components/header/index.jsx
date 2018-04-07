import React from 'react';
import css from './styles.less';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.PureComponent {

    onSubmit = event => {
        event.preventDefault();

        const { history } = this.props;
        const data = new FormData(event.target);

        history.push(`/items?search=${ data.get('search') }`);
    }

    render() {
        let query = {};
        const { search } = this.props.location;

        if (search.length) {
            query = search.slice(1).split('&').reduce((query, entry) => {
                const [key, value] = entry.split('=');

                return Object.assign(query, {
                    [key]: value
                })
            }, {});
        }

        return (
            <header className={ css.header }>
                <div className={ css.wrapper }>
                    <h1 className={ css.title }>
                        <Link to="/" className={ css.logo }>Mercado Libre</Link>
                    </h1>
                    <form className={ css.search } onSubmit={ this.onSubmit }>
                        <input className={ css.text } type="text" name="search" defaultValue={ query.search } placeholder="Nunca dejes de buscar" />
                        <input className={ css.submit } type="submit" value="Buscar" />
                    </form>
                </div>
            </header>
        );
    }

}

export default withRouter(Header);
