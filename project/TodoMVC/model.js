(function(exports){
    function Model(storage) {
        console.log('Model created');
        this.storage = storage;
    }
    Model.prototype.create = function(title, callback){
        console.log('Model.create() method execute!');
        title = title || '';
        callback = callback || function(){};

        var newItem = {
            title: title.trim(),
            completed: false
        };
        this.storage.save(newItem, callback);
    };
    Model.prototype.read = function(callback){
        console.log('Model.prototype.read() executed');
        this.storage.findAll(callback);
    };
    Model.prototype.remove = function(id, callback){
        console.log('Model.prototype.remove() executed');
        this.storage.remove(id, callback);
    };
    Model.prototype.update = function(id, data, callback){
        console.log('Model.prototype.update() executed');
        this.storage.save(id, data, callback);
    };
    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this)