const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI2;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
    );
    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log("MongoDB database connection established successfully")
    })

    app.use('/api/auth', require('./routes/auth.routes'))
    app.use('/position', require('./routes/position'))
    app.use('/apikeys', require('./routes/api.routes'))

app.listen(port, () => {
    console.log('Server is running on port 5000...')
})


app.use('/api/auth', require('./routes/auth.routes'))
app.use('/position', require('./routes/position'))