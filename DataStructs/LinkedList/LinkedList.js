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
        return node && node.value;
    }

    remove (target) { // 특정 객체 삭제
        let node = null; // 삭제 대상

        let before = null; // 앞쪽 노드
        let next = this.#root; // 현재 노드
        while(next){ // null, undefined 가 아니면 계속 진행
            if( next.value == target ) break; // 대상이 일치하면 끝
            before = next; // 이전 노드로 기록
            next = next.point; // 다음으로 이동
        }
        if(next) { // 찾아낸 값이 있으면
            if(!before) this.#root = next.point; // 찾은 값이 루트라면 루트 갱신
            else before.point = next.point; // 루트 외의 노드라면 뒤쪽과 연결
            next.point = null; // 연결 끊기
            node=next; // 노드 빼내기
        } 
        return node && node.value; // 반환
    }

    removeByIndex (idx) { // 인덱스 기반으로 삭제
        // 인덱스가 존재하지 않는 값으로 나오면, null 반환
        let node = null; 

        let before = null; // 앞쪽 노드
        let next = this.#root; // 현재 노드
        for(let i=0; next && i<idx; i++) { 
            // 가능한 범위 내에서, 인덱스 위치까지 이동
            before = next;
            next = next.point;
        }

        if(next) { // 찾아낸 값이 있으면
            if(!before) this.#root = next.point; // 찾은 값이 루트라면 루트 갱신
            else before.point = next.point; // 루트 외의 노드라면 뒤쪽과 연결
            next.point = null; // 연결 끊기
            node=next; // 노드 빼내기
        } 
        return node && node.value; // 반환
    }

    isEmpty () { return !this.#root; }
}

module.exports = LinkedList;