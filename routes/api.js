const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Services = require('../services/services');
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
 */
router.post('/:name?/:method?', function (req, res, next) {
    let obj = req.body || {};
    let name = req.params.name;
    let method = req.params.method;    
    let refService = Services[name + 'Service'];  
    let service = undefined;  
    if (!refService) {        
        res.json("请求参数错误");
        return;
    }
    service = new refService();
    if(!service[method]){
        res.json("请求参数错误");
        return;
    }
    service[method](obj, name, function (result) {
        res.json(result);
    });
    return;
});
module.exports = router;