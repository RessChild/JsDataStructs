const LinkedList = require('./LinkedList');

// LinkedList 생성
const list = new LinkedList();

console.log("======== Linked List ========")
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

const dataA = { test: 3 };
const dataB = { value: 4 };
const dataC = { check: 5 };

console.log("======== 삽입 예시 ========")
console.log("--------- insert Method -----------");

list.insert(0, dataA); // 첫 값은 루트에 삽입과 동일
list.insert(3, dataB); // 갯수 범주를 넘어서면 가장 끝에 삽입
list.insert(1, dataC); // 일반적인 삽입
// 배열 내 데이터 : [ { test: 3 }, { check: 5 }, { value: 4 }]

console.log(list.popFront());
console.log(list.popFront());
console.log(list.popFront());

console.log("======== 출력 예시 ========")
console.log("--------- remove Method -----------");

list.insert(0, dataA); // 첫 값은 루트에 삽입과 동일
list.insert(3, dataB); // 갯수 범주를 넘어서면 가장 끝에 삽입
list.insert(1, dataC); // 일반적인 삽입

console.log(list.remove(dataC));
console.log(list.remove(dataA));
console.log(list.removeByIndex(0)); // 남은 값은 dataB
console.log(list.removeByIndex(0)); // 남은 데이터 수를 초과하면 null
// 출력 : { check: 5 }, { test: 3 }, { value: 4 }, null

console.log("--------- 출력 종료 -----------");
console.log(list.isEmpty());
