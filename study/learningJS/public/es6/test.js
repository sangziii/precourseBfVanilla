const obj = {};

obj.color = "yellow";
obj["not an identifier"] = 3;
obj["not an identifier"];
obj["color"];

const SIZE = Symbol();
obj[SIZE] = 8;
obj[SIZE];

console.log("obj.SIZE : ", obj.SIZE);
console.log("obj[SIZE] : ", obj[SIZE]);
console.log('obj["SIZE"] : ' ,obj["SIZE"]);

const sam1 = {
    name: 'Sam',
    age: 4,
};

let a = 1;
let b = a;
a = 2;
console.log(b);

function change(a){
    a = 5;
}

a = 3;
change(a);
