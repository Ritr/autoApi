const chokidar = require('chokidar');
const fs = require('fs');
var watcher = chokidar.watch('./models', {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});
// Something to use when events are received.
var log = console.log.bind(console);
//Service template
function addService(path){
    var reg = /([^<>/\\\|:""\*\?]+)\.\w+$/;
    var fileName = path.match(reg)[1];
    var serviceName = fileName.replace("Model", "Service");
    var serviceFile = `./services/${serviceName}.js`;
    var requireStr = `\r\nexports.userService = require('./${serviceName}').service;`;
    var str =  `var baseService = require('./baseService').service;
                var mongoose = require('mongoose');
                var Schema = mongoose.Schema;
                var model = require('../models/${fileName}').model;
                class Service extends baseService {
                    constructor() {
                        super();
                        this.entity = model;
                    }
                }
                exports.service = Service;`
    fs.writeFileSync(serviceFile, str);
    fs.appendFileSync('./services/services.js',requireStr);
}

// Add event listeners.
watcher
    .on('add', path => addService(path))
    .on('change', path => log(`File ${path} has been changed`))
    .on('unlink', path => log(`File ${path} has been removed`));