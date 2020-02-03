var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

/* GET home page. */
router.get('/all', function(req, res, next) {
    //mongoose.Collections.find(function(err, students) {
    mongoose.Collections.students.find((err, students) => {
        if (err) {
            res.status(500);
            res.json('error: ' + err);
            return;
        }

        res.json(students);
    });
});

module.exports = router;
