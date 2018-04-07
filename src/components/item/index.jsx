import React from 'react';
import axios from 'axios';
import css from './styles.less';

export default class Item extends React.PureComponent {

    state = {
        item: null
    }

    componentDidMount() {
        const { params } = this.props.match;

        axios.get(`/api/items/${ params.id }`).then(({ data }) => {
            this.setState({
                item: data.item
            });
        });
    }

    render() {
        if (!this.state.item) {
            return null;
        }
        return (
            <article className={ css.item }>
                <h1>{ this.state.item.title }</h1>
            </article>
        );
    }

}
