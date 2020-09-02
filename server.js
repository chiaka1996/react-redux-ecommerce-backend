const http = require('http');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const path = require('path');

//const expressfileupload = require('express-fileupload');
require('dotenv').config();

const app = express();
// const port = process.env.PORT;


app.use(cors());
app.use(express.json());
//app.use(expressfileupload());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open',(res) => {
    console.log("MongoDB connected");
});
// ,() => {
//     console.log("MongoDB connected");
// }

// app.use('/images', express.static(path.join(__dirname, 'images')));

 const api = require('./routes/Allroutes');

app.use('/apis', api );

//  const server = http.createServer(app);
app.listen(process.env.PORT);s