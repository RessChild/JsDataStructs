const Queue = require('./Queue.js');

// 객체 생성
const q = new Queue();

// 1, 'c', "String" 순서로 삽입
q.push(1);
q.push('c');
q.push("String");

// queue 가 비어있음을 확인하면서 출력
while(!q.isEmpty()) {
    console.log(q.front());
}

/* 
출력 결과:  
    1
    c
    String
*/