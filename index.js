const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.testing' : '.env'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use(require('./routes/authRouter'));
app.use(require('./routes/apiRouter'));

app.listen(process.env.PORT || 5000, () => console.log(`${process.env.APP_NAME} running on port 5000`));