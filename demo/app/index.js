const path = require('path');
const express = require('express');

const app = express();

app.disable('x-powered-by');

app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

app.get('*', (req, res) => {
  return res.sendFile(`${__dirname}/views/dist/index.html`);
});

module.exports = app;
