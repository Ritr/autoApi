var baseService = require('./baseService').service;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = require('../models/manageModel').model;
const fs = require('fs');
class Service extends baseService {
    constructor() {
        super();
        this.entity = model;
    }
    createModel(name,callback){
        this.entity.findOne({name:name},function(err,doc){
            if(!err){
                console.log(doc)
                var fileName = './models/'+doc.name + 'Model.js';
                var prototypes = doc.prototypes;
                var str = `var mongoose = require('mongoose');
                var Schema = mongoose.Schema;
                var model = new Schema({`;
                prototypes.map(item=>{
                    console.log(item);
                    str += `${item.name}:{
                        type:${item.type},
                        default:'${item.default}'
                    }`
                });
                str += `});
                exports.model = mongoose.model('${name}Model', model);`;   
                fs.writeFileSync(fileName, str);
                callback("ok，重启服务即可调用新接口，自动重启还没做~~~~~~~")
            }else{
                callback("不ok");
            }
        });
    }
}
exports.service = Service;