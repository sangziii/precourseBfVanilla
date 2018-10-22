(function(exports){
    function Storage(name, callback){
        console.log('Storage created!');
        callback = callback || function(){};
        
        this._dbName = name;
        
        if (!localStorage[name]){
            var data = {
                todos: []
            };
            localStorage[name] = JSON.stringify(data);
        }
    }
    Storage.prototype.save = function(updateData, callback, id){
        console.log('Storage.save() execute!');
        // updateData = {
        //     title: "asdfasdf",
        //     completed: false
        // }
        callback = callback || function(){};
        
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        // 수정하는 경우
        if(id){
            for(var i=0,len=todos.length; i<len; i++){
                if(todos[i].id === id){
                    for(var key in updateData){
                        todos[i][key] = updateData[key];
                    }
                    break;
                }
            }
            localStorage[this._dbName] = JSON.stringify(data);
            callback.call(this, todos);
        // 신규 데이터 등록
        } else {
            updateData.id = new Date().getTime();

            todos.push(updateData);
            localStorage[this._dbName] = JSON.stringify(data);
            callback.call(this, [updateData]);
        }
    };
    Storage.prototype.findAll = function(callback){
        console.log('Storage.findAll() execute!');
        callback = callback || function(){};
        callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
    };
    Storage.prototype.remove = function (id, callback) {
        console.log('Storage.remove() execute!');
        var data = JSON.parse(localStorage[this._dbName]);
        var todos = data.todos;

        for(var i=0,len=todos.length; i<len; i++){
            if(todos[i].id === id){
                todos.splice(i, 1);
                break;
            }
        }
        localStorage[this._dbName] = JSON.stringify(data);
        callback.call(this, todos);
    };
    exports.app = exports.app || {};
    exports.app.Storage = Storage;
})(this);