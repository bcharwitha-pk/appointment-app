const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

const base_url = "http://localhost:5000/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.set('base', base_url);
app.use(express.static('public'));

require('./api/index.js')(app);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/appoint', {useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('open', function(err, doc) {
    if(err) return console.err(err);

    app.listen(port, '0.0.0.0', () => {
        console.log("Server listening to port "+ port);
    });

    console.log("Successfully connected to MongoDB.");
});
