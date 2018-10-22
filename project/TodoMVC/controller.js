(function(exports){
    function Controller(model, view) {
        this.model = model;
        this.view = view;
        var self = this;

        this.view.bind('newTodo', function(title){
            self.addItem(title);
        });
        this.view.bind('itemRemove', function(item){
            self.removeItem(item.id);
        })
        this.view.bind('itemToggle', function(item){
            self.toggleComplete(item.id, item.completed);
        });
        this.view.bind('itemEdit', function(item){

        });
        this.showAll(); //initializing!
    }
    Controller.prototype.addItem = function(title){
        console.log('Controller.addItem() method execute!');
        var self = this;
        if(title.trim() === ''){
            return;
        }
        self.model.create(title, function(){
            self.view.render('clearNewTodo', title);
        });
        this.showAll();
    };
    Controller.prototype.showAll = function(){
        console.log('Controller.showAll() method execute!');
        var self = this;
        this.model.read(function(data){
            self.view.render('showEntries', data);
        });
    };
    Controller.prototype.removeItem = function(id){
        var self = this;
        self.model.remove(id, function(){
            self.view.render('removeItem', id);
        });
    };
    Controller.prototype.toggleComplete = function(id, completed){
        console.log('Controller.toggleComplete() method execute!');
        var self = this;
        self.model.update(id, {completed: completed}, function(){
            self.view.render('elementComplete', {
                id: id,
                completed: completed
            });
        })
    }
    exports.app = exports.app || {};
    exports.app.Controller = Controller;
})(this)