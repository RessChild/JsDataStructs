const Deque = require('./Deque');

const deque = new Deque;

// 앞부터 삽입 [ true , 'A' , 1 ] 순서로 들어감
deque.pushFront(1);
deque.pushFront('A');
deque.pushFront(true);

while(!deque.isEmpty()) { 
    // 앞쪽부터 출력
    console.log(deque.popFront());
}

// 뒤부터 삽입 [ 2, 'B , false ] 순서로 들어감
deque.pushBack(2);
deque.pushBack('B');
deque.pushBack(false);

while(!deque.isEmpty()) {
    // 뒤부터 출력
    console.log(deque.popBack());
}

/* 
출력 결과:
    true
    A
    1
    false
    B
    2
*/