var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Services = require('../services/services');
mongoose.connect('mongodb://localhost/test');
/* 
    listen all
    name    名称
    method  方法
    par     参数
    entity  实体实例
    service 服务实例
    result  返回结果
    obj     请求参数
    参数为空或者错误时调用empty
    防止程序崩溃
 */
router.post('/:name?/:method?', function (req, res, next) {
    var name = req.params.name || 'empty';
    console.log(name)
    var method = req.params.method || 'empty';
    var par = req.params.par || '';
    var service = new Services[name + 'Service']();
    var obj = req.body || {};
    obj.par = par;
    if (!Services[name + 'Service']) {
        service = new Services.emptyService();
    }
    service[method](obj, name, function (result) {
        res.json(result);
    });
    return;
});
module.exports = router;