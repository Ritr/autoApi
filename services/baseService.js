var mongoose = require('mongoose');
var Schema = mongoose.Schema;
class Service {
    constructor() {
    }
    create(obj, name, callback) {
        var result = {};
        this.entity.create(obj, function (err) {
            if (err) {
                result = { 'ok': false, 'data': {}, 'message': '创建' + name + '失败' };
            } else {
                result = { 'ok': true, "data": {}, 'message': '创建' + name + '成功' };
            }
            callback(result);
        });
    }
    /**
     * 根据_ids批量删除
     * @param {Object} obj 
     */
    deleteMany(obj, name, callback) {
        this.entity.deleteMany({ '_id': { $in: obj._ids } }, function (err) {
            if (err) {
                result = { 'ok': false, 'data': {}, 'message': '删除' + name + '失败' };
            } else {
                result = { 'ok': true, "data": {}, 'message': '删除' + name + '成功' };
            }
            callback(result);
        });
    }
    deleteOne(obj, name, callback) {
        var result = {};
        this.entity.deleteOne({ '_id': obj._id }, function (err) {
            if (err) {
                result = { 'ok': false, 'data': {}, 'message': '删除' + name + '失败' };
            } else {
                result = { 'ok': true, "data": {}, 'message': '删除' + name + '成功' };
            }
            callback(result);
        });
    }
    updateOne(obj, name, callback) {
        var result = {};
        this.entity.updateOne({ '_id': obj._id }, obj, function (err) {
            if (err) {
                result = { 'ok': false, 'data': {}, 'message': '更新' + name + '失败' };
            } else {
                result = { 'ok': true, "data": {}, 'message': '更新' + name + '成功' };
            }
            callback(result);
        });
    }
    /**
     * 目前还没考虑好，批量更新的场景比较少见
     * @param {Object} obj 
     */
    updateMany(obj, name, callback) {
        var result = {};
        if (!obj.filter || !obj.value) {
            callback("参数不正确");
            return;
        }
        this.entity.updateOne(obj.filter, obj.value, function (err) {
            if (err) {
                result = { 'ok': false, 'data': {}, 'message': '更新' + name + '失败' };
            } else {
                result = { 'ok': true, "data": {}, 'message': '更新' + name + '成功' };
            }
            callback(result);
        });
    }
    findById(obj, name, callback) {
        var result = {};
        this.entity.find(obj._id,function(err,doc){
            if (err) {
                result = { 'ok': false, 'data': {}, 'message': '查询' + name + '失败' };
            } else {
                result = { 'ok': true, "data": doc, 'message': '查询' + name + '成功' };
            }
            callback(result);
        });
    }
    find(obj, name, callback) {
        var result = {};
        this.entity.find(obj,function(err,doc){
            if (err) {
                result = { 'ok': false, 'data': {}, 'message': '查询' + name + '失败' };
            } else {
                result = { 'ok': true, "data": doc, 'message': '查询' + name + '成功' };
            }
            callback(result);
        });
    }

}
exports.service = Service;