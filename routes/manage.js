const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Service = require('../services/manageService').service;
mongoose.connect('mongodb://localhost/test');

router.post('/createModel', function (req, res, next) {
    let obj = req.body || {};
    let service = new Service(); 
    service.createModel(obj.name, function (result) {
        res.json(result);
    });
    return;
});
module.exports = router;