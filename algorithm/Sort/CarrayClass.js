function Carray(numElements){
    this.dataStore = [];
    this.pos = 0;
    this.numElements = numElements;

    for(var i=0; i<numElements; i++){
        this.dataStore[i] = i;
    }
}

Carray.prototype.setData = function(){
    for(var i=0; i<this.numElements; i++){
        this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 10));
    }
}

Carray.prototype.clear = function(){
    for(var i=0; i<this.numElements; i++){
        this.dataStore[i] = 0;
    }
}

Carray.prototype.insert = function(element){
    this.dataStore[this.pos++] = element;
}

Carray.prototype.toString = function(){
    var retstr = '';
    for(var i=0; i<this.numElements; i++){
        retstr += this.dataStore[i] + " ";
        if(i>0 && i%10===0){
            retstr += "\n";
        }
    }
    return retstr;
}

Carray.prototype.swap = function(arr, idx1, idx2){
    var temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
}

Carray.prototype.bubbleSort = function () {
    len = this.dataStore.length;

    for (k = 0; k <= len-2; k++) {
        for (var i = 0; i < len - k; i++) {
            if (this.dataStore[i] > this.dataStore[i + 1]) {
                this.swap(this.dataStore, i, i + 1);
            }
        }
        console.log(this.toString());
    }
}

Carray.prototype.selectionSort = function(){
    len = this.dataStore.length;
    var min, temp;

    for(k=0; k<len-1; k++){
        min = k;
        for (var i=k; i<len-1; i++) {
            if (this.dataStore[min] > this.dataStore[i+1]){
                min = i + 1;
            }
        }
        if (this.dataStore[k] > this.dataStore[min]){
            temp = this.dataStore[k];
            this.dataStore[k] = this.dataStore[min];
            this.dataStore[min] = temp;
        }
        console.log(this.toString());
    }
}

Carray.prototype.insertionSort = function(){
    len = this.dataStore.length;
    var temp;

    for(var outer=1; outer<len; outer++){
        for(var inner=outer-1; inner>=0; inner--){
            if(this.dataStore[inner] > this.dataStore[outer]){
                temp = this.dataStore[outer];
                this.dataStore[outer] = this.dataStore[inner];
                this.dataStore[inner] = temp;
                outer--;
            }
        }
    }
}

var myNums = new Carray(10);
// console.log('Before BubbleSort');
// myNums.setData();
// console.log(myNums.toString());
// console.log('After BubbleSort');
// myNums.bubbleSort();
// console.log(myNums.toString());

console.log('Before SelectionSort');
myNums.setData();
console.log(myNums.toString());
console.log('After insertionSort');
myNums.insertionSort();
console.log(myNums.toString());