const express = require('express');

const connectDb = require('./db/connect-db');
const path = require('path');

const modelRoute = require('./routes/model-rotes');

require('pg').types.setTypeParser(1114, function(stringValue) {
    return new Date(stringValue.substring(0, 10) + 'T' + stringValue.substring(11) + 'Z');
});

const PORT = 3000;
const app = express();
app.set('port',PORT);
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

// app.use(bodyParser.json());

modelRoute(app);
app.use('/', express.static(path.join(__dirname, '../dist')));


app.listen(PORT, () => console.log(`server backend listening port ${PORT}`));

