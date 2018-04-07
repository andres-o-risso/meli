const axios = require('axios');
const { api_url, author } = require('./constants');

module.exports = (req, res) => {
    if (!req.query.q) {
        return res.status(400).end();
    }
    axios.get(`${ api_url }/sites/MLA/search?q=${ req.query.q }`).then(items_response => {
        const items = items_response.data.results.slice(0, 4).map(item => {
            const {
                id,
                title,
                currency_id: currency,
                price,
                thumbnail: picture,
                condition,
                address,
                shipping
            } = item;
            const [
                ammount,
                decimals
            ] = (price).toString().split('.');
            const {
                state_name: location
            } = address;
            const {
                free_shipping
            } = shipping;

            return {
                id,
                title,
                price: {
                    currency,
                    ammount,
                    decimals
                },
                picture,
                condition,
                location,
                free_shipping
            }
        });
        const category_filter = items_response.data.filters.find(filter => filter.id === 'category');
        const categories = category_filter.values[0].path_from_root.map(category => category.name);

        return res.json({
            author,
            categories,
            items
        });
    }).catch(error => {
        return res.status(500).send(error.message);
    });
};
