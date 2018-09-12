class Service {
    constructor() {
    }    
    async create(obj){
        return this.entity.create(obj);
    }
    /**
     * 根据obj._ids批量删除
     * @param {Object} obj 
     */
    async asyncdeleteMany(obj){
        return this.entity.deleteMany({ '_id': { $in: obj._ids } });
    }
    async deleteOne(obj){
        return this.entity.deleteOne({ '_id': obj._id });
    }
    async updateOne(obj){
        return this.entity.updateOne({ '_id': obj._id });
    } 
    /**
     * 目前还没考虑好，批量更新的场景比较少见
     * @param {Object} obj 
     */
    async updateMany(obj,) {        
        if (!obj.filter || !obj.value) {
            return "参数不正确";
        }
        return this.entity.updateOne(obj.filter, obj.value);
    }
    async findById(obj) {        
        return this.entity.find(obj._id);
    }
    async find(obj) {        
        return this.entity.find(obj);
    }
}
exports.service = Service;