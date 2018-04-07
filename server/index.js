const api = require('./api');
const path = require('path');
const app = require('express')();
const assets = require('./assets');
const styles = require('./styles');
const scripts = require('./scripts');

app.use('/api', api);
app.use('/assets', assets);
app.use('/styles', styles);
app.use('/scripts', scripts);
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});
app.listen(3000, () => {
    console.log('running on port 3000');
});
