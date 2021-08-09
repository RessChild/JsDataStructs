const Heap = require('./Heap');

// Heap 생성
const heap = new Heap();

console.log( null > 0 )
console.log( null >= 0 )
console.log( null > 1 )
console.log( null >= 1 )
console.log( null > -1 )
console.log( null >= -1 )

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

console.log("--------- 출력 종료 -----------");
heap.search();
console.log(heap.isEmpty());

// top 에서 에러나는데, 이거 null 인 경우때문에 비교오류가 나는거같음

// console.log(heap.isEmpty());
