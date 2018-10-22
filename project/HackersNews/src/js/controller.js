(function (exports) {
    function Controller(model, view) {
        console.log('Controller is created');
        this.model = model;
        this.view = view;
        var self = this;
        this.showAll();  //initialize
    }
    Controller.prototype.showAll = function(){
        console.log('Controller.showAll() is executed!');
        this.model.read(function(data){
            this.view.render('showEntries', data);
        });
    };
    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this);