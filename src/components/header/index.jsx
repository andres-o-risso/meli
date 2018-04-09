import React from 'react';
import css from './styles.less';
import { parse } from 'query-string';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.PureComponent {

    constructor(props) {
        super(props);

        const query = parse(this.props.location.search);

        this.state = {
            search: query.search || ''
        };
    }

    componentWillReceiveProps(nextProps) {
        const prevQuery = parse(this.props.location.search);
        const nextQuery = parse(nextProps.location.search);

        if (prevQuery.search !== nextQuery.search) {
            this.setState({
                search: nextQuery.search || ''
            });
        }
    }

    onSearchChange = event => {
        this.setState({
            search: event.target.value
        });
    }

    onSearchSubmit = event => {
        event.preventDefault();
        this.props.history.push(`/items?search=${ this.state.search }`);
    }

    render() {
        return (
            <header className={ css.header }>
                <div className={ css.wrapper }>
                    <h1 className={ css.title }>
                        <Link to="/" className={ css.logo }>Mercado Libre</Link>
                    </h1>
                    <form className={ css.search } onSubmit={ this.onSearchSubmit }>
                        <input className={ css.text } type="text" name="search" onChange={ this.onSearchChange } value={ this.state.search } placeholder="Nunca dejes de buscar" />
                        <input className={ css.submit } type="submit" value="Buscar" />
                    </form>
                </div>
            </header>
        );
    }

}

export default withRouter(Header);
