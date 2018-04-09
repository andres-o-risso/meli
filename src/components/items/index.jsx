import React from 'react';
import axios from 'axios';
import css from './styles.less';
import { parse } from 'query-string';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { search } from 'store/actions/searches';

const Location = ({ children }) => (
    <div className={ css.location }>{ children }</div>
);

const Title = ({ children }) => (
    <h3 className={ css.title }>{ children }</h3>
);

const Price = ({ freeShipping, currency, ammount, decimals }) => (
    <h2 className={ css.price }>
        { `${ currency } ${ ammount }.${ decimals ? decimals : '00'}` }
        { freeShipping && <span className={ css.freeShipping }>free</span> }
    </h2>
);

const Picture = ({ url, title }) => (
    <div className={ css.picture } style={ { backgroundImage: `url(${ url })` } }>
        <img className={ css.image } src={ url } alt={ title } />
    </div>
);

const Item = ({ data }) => (
    <li className={ css.item }>
        <Link to={ `/items/${ data.id }` } className={ css.link }>
            <Picture url={ data.picture } title={ data.title } />
            <div className={ css.info }>
                <Price freeShipping={ data.free_shipping } { ...data.price } />
                <Title>{ data.title }</Title>
            </div>
            <Location>{ data.location }</Location>
        </Link>
    </li>
);

const List = ({ items }) => (
    <ul className={ css.list }>
        {
            items.map(item => (
                <Item key={ item.id } data={ item } />
            ))
        }
    </ul>
);

class Items extends React.Component {

    componentDidMount() {
        const query = parse(this.props.location.search);

        if (!this.props.items) {
            this.props.search(query.search);
        }
    }

    componentWillReceiveProps(nextProps) {
        const prevQuery = parse(this.props.location.search);
        const nextQuery = parse(nextProps.location.search);

        if (prevQuery.search !== nextQuery.search) {
            this.props.search(nextQuery.search);
        }
    }

    render() {
        const { items } = this.props;

        if (!items || items.fetching || items.error) {
            return null
        }
        if (!items.length) {
            return null;
        }
        return (
            <div className={ css.items }>
                <List items={ items } />
            </div>
        );
    }

}

export default connect(
    ({ searches }, props) => {
        const query = parse(props.location.search);

        return {
            items: searches[query.search]
        }
    },
    dispatch => {
        return {
            search: value => dispatch(search(value))
        }
    }
)(Items);
