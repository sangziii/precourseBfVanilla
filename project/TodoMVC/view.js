(function(exports){
    function View(template) {
        console.log('View created');
        this.template = template;

        this.$todoList = document.getElementById('todo-list');  // <ul>
        this.$newTodo = document.getElementById('new-todo'); // <input>
    }
    View.prototype.bind = function(event, handler){
        var self = this;
        var todo = self.$todoList;
        // event: newTodo
        // handler: controller.addItem
        if(event === "newTodo"){
            console.log('View.bind.newTodo execute!');
            var temp = this.$newTodo;
            temp.addEventListener('change', function(){
                handler(self.$newTodo.value);  // addItem(self.$newTodo.value);
            });
        } else if(event === "itemRemove"){
            console.log('View.bind.itemRemove execute!');
            todo.addEventListener('click', function(event){
                var target = event.target;
                if(target.className = 'destroy'){
                    handler({ id: self._getItemId(target.parentNode, 'li') });
                }
            });
        } else if(event === "itemToggle"){
            console.log('View.bind.itemToggle execute!');
            todo.addEventListener('click', function(event){
                var target = event.target;
                if(target.className === 'toggle'){
                    handler({id: self._getItemId(target), completed: target.checked});
                }
            });
        } else if(event === "itemEdit") {
            console.log('View.bind.itemEdit execute!');
            todo.addEventListener('dblclick', function(event){
                var target = event.target;
                if(target.tagName.toLowerCase() === 'label'){
                    handler({ id: self._getItemId(target) });
                }
            });
        } else if(event === 'itemEditDone'){
            console.log('View.bind.itemEditDone execute!');
            todo.addEventListener('keypress', function(evemt){
                if(event.keyCode === 13){
                    var target = event.target;
                    handler({ id: self._itemId(target), title: target.value });
                }
            });
        }
    };
    View.prototype.render = function(viewCmd, data){
        var self = this;
        var viewCommands = {
            showEntries: function(){
                console.log('View.render.showEntries() execute!');
                self._addItem(data);
            },
            clearNewTodo: function(){
                console.log('View.render.clearNewTodo() execute!');
                self.$newTodo.value = '';
            },
            removeItem: function(){
                console.log('View.render.removeItem() execute!');
                self._removeItem(data);
            },
            elementComplete: function(){
                console.log('View.render.elementCompleted() execute!');
                self._elementComplete(data.id, data.completed);
            },
            editItem: function(){
                console.log('View.render.elementCompleted() editItem!');
                self._editItem();
            },
            editItemDone: function(){
                console.log('View.render.elementCompleted() editItemDone!');
                self.editItemDone();
            }
        };
        viewCommands[viewCmd]();
    };
    View.prototype._addItem = function(data){
        this.$todoList.innerHTML = this.template.insert(data);
    };
    View.prototype._getItemId = function(element, tagName){
        var li;
        if(tagName){
            if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
                li = element.parentNode;
            }
        } else {
            li = element.parentNode.parentNode;
        }
        
        return parseInt(li.dataset.id, 10); 
    };
    View.prototype._itemId = function(element){
        var li = element.parentNode;
        console.log('return value = ' + li.dataset.id);
        return parseInt(li.dataset.id, 10);
    };
    View.prototype._removeItem = function(id){
        var elem = document.querySelector('[data-id="' + id + '"]');
        if(elem){
            this.$todoList.removeChild(elem);
        }
    };
    View.prototype._elementComplete = function(id, completed){
        console.log("View.prototype._elementComplete() executed");
        var listItem = document.querySelector('[data-id="' + id + '"]');
        if(listItem){
            listItem.className = completed ? 'completed' : '';
        }
    };
    View.prototype._editItem = function(id, title){
        console.log("View.prototype._editItem() executed");
        var listItem = document.querySelector('[data-id="' + id + '"]');

        if(listItem){
            listItem.className = listItem.className + 'edititng';
            
            var input = document.createElement('input');
            input.className = 'edit';

            listItem.appendChild(input);
            input.focus();
            input.value = title;
        }
    };
    View.prototype.editItemDone = function (id, title){
        console.log("View.prototype.editItemDone() executed");
        var listItem = document.querySelector('[data-id="' + id + '"]');

        if(listItem){
            var input = document.querySelector('input.edit', listItem);
            listItem.removeChild(input);
            listItem.className = listItem.className.replace('editing', '');

            var label = document.querySelectorAll('label');
            label.forEach(function(label){
                if(label.parentNode.parentNode === listItem){
                    label.textContent = title;
                }
            });
        }
    };
    exports.app = exports.app || {};
    exports.app.View = View;
})(this);