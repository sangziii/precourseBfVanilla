function CalcMethods(strArg){
    this.arg = strArg.split(" + ");
    this.argLength = this.arg.length;

    for(var i=0; i<this.argLength; i++){
        this.arg[i] >>= 0;
    }

    // return {
    //     add: function (){
    //         var answer = 0;
            
    //         for (var i=0, strLength = str.length; i<strLength; i++){
    //             answer += Number(str[i]);
    //         }
    //         return answer;
    //     }
    // }
};

var a = new CalcMethods("13 + 20");