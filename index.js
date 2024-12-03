const express = require('express');
const app = express();
const { json: bodyParsing } = require('body-parser');
const { join } = require('path');
const args = require('./args')(['env']);

const ENV = args.env;
const PORT = process.env.PORT || 3000;

app.use(bodyParsing());
if (ENV == 'dev') {
    app.use((req, _res, next) => {
        console.log(`[${new Date()}] ${req.method} ${req.path}`);
        next();
    });
}

app.use('/api', require('./api/ip'));
app.use('/', express.static(join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Running ${ENV.toUpperCase()} environment`);
    console.log(`Server running at port ${PORT}`);
});