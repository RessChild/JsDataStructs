const Heap = require('./Heap');

// Heap 생성 (default)
const heap = new Heap(); // 기본생성은 내림차순 (큰 값부터 처리)

console.log("======== Default Heap ========")
console.log("--------- 삽입 시작 -----------");
heap.search();
console.log(heap.isEmpty());
heap.push(-1)
heap.push(0)
heap.push(1)
heap.push(2)

console.log("--------- 삽입 종료 -----------");
heap.search();

console.log("--------- 출력 시작 -----------");
console.log(heap.top());
console.log(heap.top());
console.log(heap.top());
console.log(heap.top());

console.log("--------- 출력 종료 -----------");
heap.search();
console.log(heap.isEmpty(), "\n");

// Heap 생성 (custom)
const custom_heap = new Heap((parent, child) => parent < child );
// 정렬 기준을 정의 ( 부모, 자식 ) 인자를 받아서, boolean 값을 반환

console.log("======== Custom Heap ========")
console.log("--------- 삽입 시작 -----------");
custom_heap.search();
console.log(heap.isEmpty());
custom_heap.push(-1)
custom_heap.push(0)
custom_heap.push(1)
custom_heap.push(2)

console.log("--------- 삽입 종료 -----------");
heap.search();

console.log("--------- 출력 시작 -----------");
console.log(custom_heap.top());
console.log(custom_heap.top());
console.log(custom_heap.top());
console.log(custom_heap.top());

console.log("--------- 출력 종료 -----------");
custom_heap.search();
console.log(custom_heap.isEmpty());
