var modelObj = {};

function initTodo(dateId){
    function TodoItemObj(){
        this.numTodoItem = 0;
        this.numActive = 0;
        this.todoDataId = 0;
        this.dataStore = {};

        TodoItemObj.prototype.find = function(dataId){
            console.log(this.dataStore);
            for (var prop in this.dataStore) {
                if(prop === dataId){
                    return 1;
                }
            }
            return -1;
        }

        TodoItemObj.prototype.append = function (dataId, dataArr){
            this.dataStore[dataId] = dataArr;
            ++this.numTodoItem;
            ++this.numActive;
            ++this.todoDataId;
            return true;
        }

        TodoItemObj.prototype.remove = function(dataId){
            if(this.find(dataId) !== -1) {
                (!this.dataStore[dataId][1]) && --this.numActive;
                --this.numTodoItem;
                ++this.todoDataId;
                delete this.dataStore[dataId];
                return true;
            } else {
                return false;
            }
        }

        TodoItemObj.prototype.toString = function(){
            return this.dataStore;
        }

        // 인자 없으면 true
        TodoItemObj.prototype.setStatus = function(dataId, isFinished=true){
            if(this.find(dataId) !== -1){
                this.dataStore[dataId][1] = isFinished;
                isFinished ? --this.numActive : ++this.numActive;
            } else {
                return false;
            }
        }

        //완료된 todo ID 리턴
        TodoItemObj.prototype.clearCompleted = function(){
            var arrCompletedId = [];
            for (var prop in this.dataStore) {
                if (this.dataStore.hasOwnProperty(prop)) {
                    if(this.dataStore[prop][1] === true){
                        arrCompletedId.push(prop);
                    }
                }
            }
            if(arrCompletedId.length !== 0){
                for (var i=0,len=arrCompletedId.length; i<len; i++) {
                    this.remove(arrCompletedId[i]);
                }
                return arrCompletedId;
            } else {
                return -1;
            }


        }
    }

    // 빈객체 할당
    modelObj[dateId] = new TodoItemObj();
};

// modelObj["2018-9-4"]
