(function (exports) {
    function Model(storage) {
        console.log('Model is created');
        this.storage = storage;
    }
    Model.prototype.read = function(callback){
        this.storage.find(callback);
    };
    exports.app = exports.app || {};
    exports.app.Model = Model;
})(this);