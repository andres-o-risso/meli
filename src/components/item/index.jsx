import React from 'react';
import css from './styles.less';
import { connect } from 'react-redux';
import { getItem } from 'store/actions/items';

const Info = ({ condition, soldQuantity }) => (
    <p className={ css.info }>
        { condition === 'new' ? 'Nuevo' : 'Usado' } - { soldQuantity } vendidos
    </p>
);

const Title = ({ children }) => (
    <h1 className={ css.title }>{ children }</h1>
);

const Price = ({ currency, ammount, decimals }) => (
    <h2 className={ css.price }>
        <span className={ css.currency }>{ currency }</span>
        { ammount }
        <span className={ css.separator }>.</span>
        <span className={ css.decimals }>{ decimals || '00' }</span>
    </h2>
);

const Button = ({ children, onClick }) => (
    <button className={ css.buy } onClick={ onClick }>{ children }</button>
);

const Picture = ({ url, title }) => (
    <div className={ css.picture }>
        <img src={ url } alt={ title } />
    </div>
);

const Description = ({ children }) => (
    <section className={ css.description }>
        <h5 className={ css.title }>Descripcion del producto</h5>
        <p className={ css.text }>{ children }</p>
    </section>
)

class Item extends React.PureComponent {

    componentDidMount() {
        if (!this.props.item) {
            this.props.getItem(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.props.getItem(nextProps.match.params.id);
        }
    }

    onBuyClick = event => {
        event.preventDefault();
        console.log('I would like to, but I can\'t let you buy yet...');
    }

    render() {
        const { item } = this.props;

        if (!item || item.fetching || item.error) {
            return null
        }
        return (
            <article className={ css.item }>
                <section className={ css.content }>
                    <Picture url={ item.picture } title={ item.title } />
                    <div className={ css.details }>
                        <Info condition={ item.condition } soldQuantity={ item.sold_quantity } />
                        <Title>{ item.title }</Title>
                        <Price { ...item.price } />
                        <Button onClick={ this.onBuyClick }>Comprar</Button>
                    </div>
                </section>
                <Description>{ item.description }</Description>
            </article>
        );
    }

}

export default connect(
    ({ items }, props) => {
        return {
            item: items[props.match.params.id]
        }
    },
    dispatch => {
        return {
            getItem: id => dispatch(getItem(id))
        }
    }
)(Item);
