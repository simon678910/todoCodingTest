const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todo');

app.use('/api', require('./routes/toDoListRoute.js'));

app.listen(port, () => {
  console.log(`To Do List app listening on port ${port}`)
})