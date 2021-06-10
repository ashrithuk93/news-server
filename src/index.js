require('./models/Users');
require('./models/News')
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const AuthRoutes = require('./routes/AuthRoutes');
const NewsRoutes = require('./routes/NewsRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(AuthRoutes);
app.use(NewsRoutes);

const mongoUri = 'mongodb+srv://admin:@Unstopable143@cluster0.0ew4r.mongodb.net/News?retryWrites=true&w=majority'

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
})

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo instance', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
    console.log('Listening on the port 3000');
})