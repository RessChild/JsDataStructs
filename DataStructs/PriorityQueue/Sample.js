const PriorityQueue = require('./PriorityQueue');

// Heap 생성 (default)
const pq = new PriorityQueue(); // 기본생성은 내림차순 (큰 값부터 처리)

console.log("======== Default Priority Queue ========")
console.log("--------- 삽입 시작 -----------");
console.log(pq.isEmpty());

pq.push(-1)
pq.push(1)
pq.push(0)
pq.push(2)

console.log("--------- 출력 시작 -----------");
console.log(pq.isEmpty());
console.log(pq.top());
console.log(pq.top());
console.log(pq.top());
console.log(pq.top());

console.log("--------- 출력 종료 -----------");
console.log(pq.isEmpty(), "\n");

// Heap 생성 (custom)
const custom_pq = new PriorityQueue((parent, child) => parent < child );
// 정렬 기준을 정의 ( 부모, 자식 ) 인자를 받아서, boolean 값을 반환

console.log("======== Custom Priority Queue ========")
console.log("--------- 삽입 시작 -----------");
console.log(pq.isEmpty());
custom_pq.push(-1)
custom_pq.push(0)
custom_pq.push(1)
custom_pq.push(2)

console.log("--------- 출력 시작 -----------");
console.log(pq.isEmpty());
console.log(custom_pq.top());
console.log(custom_pq.top());
console.log(custom_pq.top());
console.log(custom_pq.top());

console.log("--------- 출력 종료 -----------");
console.log(custom_pq.isEmpty());
