// 앞뒤로 삽입, 삭제가 모두 가능한 큐
class Deque {
    #list=[]; // Deque 정보
    pushFront (data) { // 앞쪽으로 삽입
        this.#list.unshift(data);
    }
    pushBack (data) { // 뒤쪽으로 삽입
        this.#list.push(data);
    }
    popFront () { // 앞쪽에서 제거
        return this.#list.shift();
    }
    popBack () { // 뒤쪽에서 제거
        return this.#list.pop();
    }
    isEmpty () { return !this.#list.length; }
};

module.exports = Deque;