const Deque = require('../Deque/Deque');

// Heap 트리를 구성할 노드 클래스
class Node {
    #data = null; // 보유한 값은 미설정
    #parent = null; // 자신의 부모
    #children = [null, null]; // 좌우 자식 정보

    constructor(parent) { // 부모정보가 반드시 필요
        parent && (this.#parent = parent);
    }
    // 리프인가? (자식이 모두 null 이면 리프)
    isLeaf () { return this.#children.reduce((acc, child) => acc || child ) === null; }

    // 데이터 setter/getter
    setData(data) { this.#data = data; }
    getData() { return this.#data; }
    // 부모정보
    setParent (parent) { this.#parent = parent; }
    getParent () { return this.#parent; }
    // 자식정보
    makeChildren () { 
        this.#children = this.#children.map((child) => {
            // 이미 만들어진게 있으면 그대로 반환하고, 없으면 새로 만들어 반환
            return child || new Node(this);
        })
        return this.#children;
    }
    setChildren (newChildren) { this.#children = newChildren; }
    getChildren () { return this.#children; } // 자식정보 반환
}

class Heap {
    #root = null; // Heap 트리의 루트
    #deq = new Deque(); // 트리의 삽입구간을 저장할 deque

    // 비교기준이 되는 함수
    #compare = (p, c) => { // 기본은 내림차순 ( 큰 값부터 )
        // null 의 경우, 0과 같은 비교연산 취급하므로, 예외처리가 필요함
        return p >= c;
    };
    constructor(customCompare) {
        // 루트노드를 만들고, 해당 시점이 처음 값으로 들어갈 공간
        this.#root = new Node();
        this.#deq.pushBack(this.#root); 
        // 비교함수를 따로 만들었다면, 교체
        if(typeof customCompare === "function") this.#compare = customCompare;
    }
    isEmpty() { // Heap이 비어있는가?
        /* Deque 나중에 기능 추가해서 개선하는게 좋아보임 */
        const next = this.#deq.popFront();
        this.#deq.pushFront(next);
        return next.getParent() === null; // 넣을 공간이 루트면 비어있는것
    }
    push(data) { // Heap 에 데이터 삽입 과정
        
        const next = this.#deq.popFront(); // 넣을 위치 얻어와서
        next.setData(data); // 값 세팅

        const nextChildren = next.makeChildren(); // 새 자식을 생성
        nextChildren.forEach( element => { // 각 자식에 대해서 null 판별하고 삽입
            element && this.#deq.pushBack(element);
        });

        // 삽입한 노드를 heap 규칙에 따라 정렬
        while( next.getParent() ) { // 최대 꼭대기까지 올라감
            const nextParent = next.getParent(); // 현재 노드의 부모정보

            // 비교 결과가 참이면 이동을 멈춤 (수정 불필요)

            if( this.#compare(nextParent.getData(), next.getData()) ) break;

            // 아래쪽 자식정보랑, 위쪽 부모정보는 변함없음
            const saveChildren = next.getChildren(); // 내 자식정보들
            const saveParent = nextParent.getParent(); // 내 부모가 가지고 있던 부모정보

            // 부모가 갖고있던 자식정보 중, next 위치를 찾아서 값을 바꿈
            const newCList = nextParent.getChildren().map( child => {
                // 기존에 비교했던 놈이 있던 곳이면 부모정보로 바꾸기
                if (child === next) {
                    return nextParent;
                }
                else {
                    child.setParent(next);
                    return child;
                }
            });
            
            // 내 자식들이 갖고있던 부모정보도 수정
            saveChildren.forEach( child => child.setParent(nextParent) );

            // 부모를 밑으로 내림
            nextParent.setChildren(saveChildren);
            nextParent.setParent(next);

            // 현재 노드를 위로 올림
            next.setChildren(newCList);
            next.setParent(saveParent);
            if( !saveParent ) this.#root = next; // 끝까지 올라간 경우, 루트가 바뀜
            else { // 루트가 아니면 그 부모정보로 연결된 자식정보를 수정
                saveParent.setChildren(
                    saveParent.getChildren().map( child => child === nextParent ? next: child ));
            }
        }
    }
    top() {
        // 가장 위에 있는 놈을 제공하고, 밑단을 붙여서 다시 정리
        const output = this.#root;

        // 가장 마지막으로 붙은 두 노드의 부모가 가장 마지막으로 값을 받은 놈
        const first = this.#deq.popBack();
        const second = this.#deq.popBack();
        let lastNode = first.getParent() || second.getParent();
        {
            // 루트의 부모정보를 얻어와 부모쪽에 붙일 빈 노드를 만듦 ( 부모랑 연결 끊기 )
            const lastNode_parent = lastNode.getParent();
            const newEmptyNode = new Node(lastNode_parent);

            // 꺼내오는 놈이 루트가 아니라면, 부모정보쪽에 갱신이 필요
            if( lastNode_parent ) {
                lastNode_parent.setChildren(
                    lastNode_parent.getChildren()
                        .map( child => child === lastNode ? newEmptyNode : child ));
                this.#root = lastNode; // 루트 정보를 갱신
            }
            else { // 단 꺼내는값이 루트면, 빈 노드가 루트가 되야함
                this.#root = newEmptyNode;
            } 
            
            this.#deq.pushFront( newEmptyNode ); // 가장 먼저 채워져야 하는 놈이기 때문에, 앞쪽에 붙음
            
            // 현재 루트가 가진 자식 정보를 받아오고, 위치를 바꿔줌
            lastNode.setParent(null); // 루트로 갈거기 떄문에 정보 제거
            // 기존 루트의 자식들이 새 루트를 보도록 수정
            const rootChildren = output.getChildren();
            rootChildren.forEach( child => child.setParent(lastNode) ); 
            lastNode.setChildren( rootChildren ); // 자식정보로 넘기고
        }

        // 맨 위로 올라간 놈을 규칙에 맞게 조정
        let next, leftover;
        {
            const [ leftC, rightC ] = lastNode.getChildren(); // 자식 둘 중, 규칙에 맞는 놈을 선택
            if( ( leftC == null || !rightC == null ) || this.#compare( leftC.getData(), rightC.getData() )) {
                // 자식 노드 중 null 이 껴있거나, 비교상으로 우위를 비교
                next = leftC;
                leftover = rightC;
            }
            else {
                next = rightC;
                leftover = leftC;
            }
        }
        while( !next.isLeaf() ) { // 리프가 아닐동안 진행
            // 구조가 멀쩡하면 더이상 수정 없음
            if( this.#compare(lastNode.getData(), next.getData()) ) break;

            // 고정값을 저장
            const saveChildren = next.getChildren();
            const saveParent = lastNode.getParent();

            // 서로 바꿔야하는 값도 새로 만듦
            const newCList = lastNode.getChildren().map( child => {
                if( child === next ) {
                    return lastNode;
                } else {
                    child.setParent(next);
                    return child
                }
            });
            
            // 자식이 갖고있던 자식의 부모정보를 갱신
            saveChildren.forEach( child => child.setParent(lastNode) );

            // 이전이 루트였으면, 루트도 바꿈
            if( saveParent == null ) {
                this.#root = next; 
            } 
            else { // 루트가 아니라면 이놈의 자식연결도 바꿔줘야함
                saveParent.setChildren(
                    saveParent.getChildren().map( child => child === lastNode ? next : child ));
            }

            // 아래놈을 위로 올림
            lastNode.setParent(next);
            lastNode.setChildren(saveChildren);

            // 윗놈을 아래로 내림
            next.setParent(saveParent);
            next.setChildren(newCList);
            
            // 남아있던 다른놈은 부모정보가 next 로 바뀜
            leftover.setParent(next);

            const [ leftC, rightC ] = saveChildren; // 자식 둘 중, 규칙에 맞는 놈을 선택
            if(this.#compare(leftC.getData(), rightC.getData())) {
                next = leftC;
                leftover = rightC;
            }
            else {
                next = rightC;
                leftover = leftC;
            }
        }

        return output.getData();
    }

    // 잘 들어가있나 탐색확인
    search(node) {
        let target = node || this.#root;
        console.log("탐색시작:: ", target.getData(), " / 부모::", target.getParent() && target.getParent().getData());

        const children = target.getChildren();
        children.forEach( child => {
            if( child != null ) this.search(child);
        });

        console.log("탐색종료:: ", target.getData());
    }
}

module.exports = Heap;