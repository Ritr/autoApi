var baseService = require('./baseService').service;
var model = require('../models/userModel').model;
class Service extends baseService {
    constructor() {
        super();
        this.entity = model;
    }
}
exports.service = Service;