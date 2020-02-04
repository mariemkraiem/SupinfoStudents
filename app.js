var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const dbUrl = 'mongodb://localhost:27017/SupinfoStudents';
let mongoose =  require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

/*var shcoolsRouter = require('./routes/schools');
var companysRouter = require('./routes/companys');
var contractsRouter = require('./routes/contracts');
var studentSchoolsRouter = require('./routes/studentsSchools');*/


var app = express();

app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
/*app.use('/schools', shcoolsRouter);
app.use('/companys', companysRouter);
app.use('/contacts', contractsRouter);
app.use('/studentsSchools', studentSchoolsRouter);*/

mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
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

    /*let schoolSchema = mongoose.Schema({
        name: String,
        country: String
    }, {Strict: false});
    mongoose.Collections.schools = mongoose.model('schools', schoolSchema)

    let companySchema = mongoose.Schema({
        name: String,
        country: String
    }, {Strict: false});
    mongoose.Collections.companys = mongoose.model('companys', companySchema)

    let contactSchema = mongoose.Schema({
        idStudent : Int8Array,
        idCompany : Int8Array,
        type: String,
        startDate : Date,
        endDate : Date
    }, {Strict: false});
    mongoose.Collections.contracts = mongoose.model('contacts', contactSchema)

    let studentSchoolSchema = mongoose.Schema({
        idStudent : Int8Array,
        idSchool : Int8Array,
        startDate : Date,
        endDate : Date
    }, {Strict: false});
    mongoose.Collections.studentsSchools = mongoose.model('studentSchool', studentSchoolSchema)*/


});

module.exports = app;
