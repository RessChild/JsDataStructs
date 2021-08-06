const Heap = require('./Heap');

// Heap 생성
const heap = new Heap();

console.log(heap.isEmpty());
heap.push(1)
heap.push(2)

console.log(heap.top());
console.log(heap.top());

console.log(heap.isEmpty());
