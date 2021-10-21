const LinkedList = require('./LinkedList');

// LinkedList 생성
const list = new LinkedList();

console.log("======== Default Linked List ========")
console.log("--------- 삽입 시작 -----------");
console.log(list.isEmpty());

list.pushBack({ test: 1, value: 2 });
list.pushBack(0);
list.pushFront(-1);
list.pushFront(3);
list.insert(2, { test: 2 });
// 출력 : [ 3, -1, { test:2 }, { test:1, value: 2 }, 0]

console.log("--------- 출력 시작 -----------");
console.log(list.isEmpty());
console.log(list.popFront());
console.log(list.popFront());
console.log(list.popFront());
console.log(list.popFront());
console.log(list.popFront());

console.log("--------- 출력 종료 -----------");
console.log(list.isEmpty());