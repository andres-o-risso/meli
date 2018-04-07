const axios = require('axios');
const { api_url, author } = require('./constants');

module.exports = (req, res) => {
    if (!req.params.id) {
        return res.status(400).end();
    }
    axios.all([
        axios.get(`${ api_url }/items/${ req.params.id }`),
        axios.get(`${ api_url }/items/${ req.params.id }/description`)
    ]).then(axios.spread((item_response, description_response) => {
        const {
            id,
            title,
            currency_id: currency,
            price,
            thumbnail: picture,
            condition,
            shipping,
            sold_quantity
        } = item_response.data;
        const [
            ammount,
            decimals
        ] = (price).toString().split('.');
        const {
            free_shipping
        } = shipping;
        const {
            text,
            plain_text
        } = description_response.data;
        const description = text || plain_text;
        const item = {
            id,
            title,
            price: {
                currency,
                ammount,
                decimals
            },
            picture,
            condition,
            free_shipping,
            sold_quantity,
            description
        };

        return res.json({
            author,
            item
        });
    })).catch(error => {
        return res.status(500).send(error.message);
    });
};
