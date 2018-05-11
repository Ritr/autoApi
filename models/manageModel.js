
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var model = new Schema({
    name: String,
    prototypes:[
        {
            // name:"",
            // type:"",
            // default:"",
            // description:""
        }
    ]
});
exports.model = mongoose.model('manageModel', model);