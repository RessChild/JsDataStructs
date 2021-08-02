const Stack = require('./Stack.js');

// 객체 생성
const s = new Stack();

// 1, 'c', "String" 순서로 삽입
s.push(1);
s.push('c');
s.push("String");

// Stack 이 비어있음을 확인하면서 출력
while(!s.isEmpty()) {
    console.log(s.pop());
}

/* 
출력 결과:  
    String
    c
    1
*/