(function (exports) {
    function View(template) {
        console.log('View is created');
        this.template = template;

        this.$contentTable = document.getElementsByClassName('itemlist')[0];
    }
    View.prototype.bind = function(event, handler){
        var self = this;
        // event -> 
        // handler ->
        if(event === ''){
            console.log('View.bind.() is executed');
        }
    };
    View.prototype.render = function(cmd, data){
        var self = this;

        var viewCommands = {
            showEntries: function(){
                console.log('View.render.showEntries() is executed!');
                self._addItem(data);
            },
            b: function(){

            }
        };
        viewCommands[cmd]();
    };
    View.prototype.showEntries = function(data){
        this.$contentTable.children[0].innerHTML = this.template.insert(data);
    }
    exports.app = exports.app || {};
    exports.app.View = View;
})(this);