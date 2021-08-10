// Heap 과 동일한 명칭이지만, 배열로 만들 계획
class PriorityQueue {
    // 인덱스는 1부터 사용 + 첫 값은 널포인터로 정의
    #list = [null];
    #compare = (p, c) => { // 비교기준
        return p >= c;
    }
    constructor(compare) {
        this.#compare = compare || this.#compare;
    }

    // 지원 함수들
    push (data) {
        // 맨 뒤쪽에 새로운 값을 삽입
        // this.search();
        let idx = this.#list.length; // 새 값이 들어가는 인덱스 정보
        this.#list.push(data);
        // this.search();

        while ( Math.floor(idx/2) > 0 ) { // 규칙에 맞춰서 위로 거슬러 올라감
            const pIdx = Math.floor(idx/2); // 부모 인덱스
            if( this.#compare(this.#list[pIdx], this.#list[idx]) ) break; // 규칙 성립하면 무시
            
            // console.log(data, "거슬러 올라감", pIdx, idx);

            const tmp = this.#list[pIdx];
            this.#list[pIdx] = this.#list[idx];
            this.#list[idx] = tmp; // 값 변경
            idx = pIdx; // 위로 올라감
        }
    }
    top () {
        const output = this.#list[1]; // 1번 인덱스가 pq 의 출력값
        this.#list[1] = this.#list.pop(); // 맨 뒤를 뽑아내고 앞으로 집어넣음

        let idx = 1; // 1번인덱스부터 하위로 내려감
        while( idx * 2 < this.#list.length ) {
            // 우측 자식이 존재하면, 두 값을 비교해서 규칙에 맞는 놈을 선택
            // 존재하지 않으면 왼쪽 자식을 선택할 수 밖에 없음
            let next = idx*2 + 1 < this.#list.length 
                ? (this.#compare( this.#list[idx*2], this.#list[idx*2 + 1] ) ? idx*2 : idx*2 + 1 )
                : idx*2;
            // 규칙이 성립하면 종료
            if( this.#compare(this.#list[idx], this.#list[next]) ) break;

            const tmp = this.#list[next];
            this.#list[next] = this.#list[idx];
            this.#list[idx] = tmp;

            idx = next; // 다음 비교로 넘어감
        } 
        return output;
    }
    search() {
        console.log(this.#list);
    }
    isEmpty () { return this.#list.length <= 1; }
}

module.exports = PriorityQueue;