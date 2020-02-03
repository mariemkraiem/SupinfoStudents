var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dbUrl = 'mongodb://localhost:27017/SupinfoStudents';
let mongoose =  require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTechnology: true});
let dbConnection = mongoose.connection;
dbConnection.on('error', () => {
    console.log('Error while connecting to database');
});
dbConnection.on('open', () => {
    console.log('Connected to mongo db');

    mongoose.Collections = {};

    let studentSchema = mongoose.Schema({
        name: String,
        subscriptionDate: String
    }, {Strict: false});
    mongoose.Collections.students = mongoose.model('students', studentSchema)
});

module.exports = app;