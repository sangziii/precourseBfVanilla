"use strict";

var obj = {};
obj.color = "yellow";
obj["not an identifier"] = 3;
obj["not an identifier"];
obj["color"];
var SIZE = Symbol();
obj[SIZE] = 8;
obj[SIZE];
console.log("obj.SIZE : ", obj.SIZE);
console.log("obj[SIZE] : ", obj[SIZE]);
console.log('obj["SIZE"] : ', obj["SIZE"]);