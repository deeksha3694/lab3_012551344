const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//mongodb connection
mongoose.connect('mongodb+srv://admin:admin@cluster0-4cjrk.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () =>{
    console.log('connected to database');
});


app.use('/graphql',graphqlHTTP({
    schema, 
    graphiql: true
}));

app.listen(4000, () => {
    console.log(`Example app listening on port ${4000}!`)
});

