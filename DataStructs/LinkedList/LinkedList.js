class Node {
    #val;
    #point;
    constructor(val) {
        this.#val = val;
        this.#point = null;
    };
    get value() { // getter, setter
        return this.#val;
    }
    set value(val){
        this.#val = val;
    }
    get point(){
        return this.#point;
    }
    set point(point){
        this.#point = point;
    }
}

class LinkedList {
    #root;
    constructor() {
        this.#root = null;
    }
    pushFront (data) { // 앞쪽으로 삽입
        const node = new Node(data); // 새 노드 생성
        node.point = this.#root; // 노드의 뒤에 현재까지의 리스트를 연결
        this.#root = node; // 루트 변경
    }
    pushBack (data) { // 뒤쪽으로 삽입
        const node = new Node(data);

        if(!this.#root) this.#root = node; // 첫 값이면 그냥 삽입
        else {
            let tail = this.#root;
            while(tail.point) tail = tail.point; // 꼬리 찾기
            tail.point = node; // 꼬리에 삽입
        }
    }
    insert(idx, data) { // 특정 위치에 삽입
        if(idx < 1) this.pushFront(data); // 0 이하이면 앞쪽 삽입과 동일
        else {
            const node = new Node(data);

            if(!this.#root) this.#root = node; // 첫 값 예외처리
            else {

                let next = this.#root; // 루트부터 탐색
                for(let k=1; k<idx; k++) { // 탐색 과정
                    if(!next.point) break; // 길이 끊겼으면 위치탐색 종료
                    next = next.point;
                }
                const swap = next.point; // 기존에 뒤에 붙어있던 연결정보
                next.point = node; // 새 노드를 끼워넣고
                node.point = swap; // 그 뒤에 기존 연결을 마무리
            }
        }
    }

    popFront(){ // 맨 앞부터 제거
        const node = this.#root; // 맨 앞을 꺼내와서 
        if(node){ // 값이 있으면
            this.#root = node.point;
            node.point = null; // 연결 끊기
        }
        return node.value;
    }
    // remove (target) { // 특정 객체 삭제
    //     const next = this.#root;
    //     while(next){ // null, undefined 가 아니면 계속 진행
    //         if( next.point == target ) break; // 대상이 일치하면 끝
    //         next = next.point; // 다음으로 이동
    //     }
    //     if(!next) return null; // 삭제한 값이 없음
        
    //     const targetNode = next.point; // 지워야하는 타겟노드

    // }
    // removeByIndex (idx) { // 인덱스 기반으로 삭제

    // }

    isEmpty () { return !this.#root; }
}

module.exports = LinkedList;