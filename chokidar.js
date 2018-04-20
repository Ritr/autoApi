const chokidar = require('chokidar');
const fs = require('fs');
var watcher = chokidar.watch('./models', {
    ignored: /(^|[\/\\])\../,
    persistent: true,
    ignoreInitial: true
});
// Something to use when events are received.
var log = console.log.bind(console);
function fileInfo(path) {
    var reg = /([^<>/\\\|:""\*\?]+)\.\w+$/;
    var fileName = path.match(reg)[1];
    var serviceName = fileName.replace("Model", "Service");
    var serviceFile = `./services/${serviceName}.js`;
    var requireStr = `\r\nexports.userService = require('./${serviceName}').service;`;
    return {
        fileName: fileName,
        serviceName: serviceName,
        serviceFile: serviceFile,
        requireStr: requireStr
    }
}
//Service template
function addService(path) {
    var file = fileInfo(path);
    var str = `var baseService = require('./baseService').service;
                var mongoose = require('mongoose');
                var Schema = mongoose.Schema;
                var model = require('../models/${file.fileName}').model;
                class Service extends baseService {
                    constructor() {
                        super();
                        this.entity = model;
                    }
                }
                exports.service = Service;`
    fs.writeFileSync(file.serviceFile, str);
    fs.appendFileSync('./services/services.js', file.requireStr);
}
function removeService(path) {
    var file = fileInfo(path);
    //删除引用
    var data = fs.readFileSync('./services/services.js', 'utf-8');
    var str = data.replace(file.requireStr, '');
    fs.writeFileSync('./services/services.js', str);
    //移除文件
    fs.unlinkSync(file.serviceFile);
}
// Add event listeners.
watcher
    .on('add', path => addService(path))
    .on('unlink', path => removeService(path));

