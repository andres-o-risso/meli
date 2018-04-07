import React from 'react';
import axios from 'axios';
import css from './styles.less';
import { Link } from 'react-router-dom';

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

export default class Items extends React.Component {

    state = {
        items: []
    }

    componentDidMount() {
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

        axios.get(`/api/items?q=${ query.search }`).then(({ data }) => {
            this.setState({
                items: data.items
            });
        });
    }

    render() {
        if (!this.state.items.length) {
            return null;
        }
        return (
            <div className={ css.items }>
                <List items={ this.state.items } />
            </div>
        );
    }

}
