class Queue {
    #list = [];
    constructor() {}; // 생성자
    push(data) { // 새 값을 뒤쪽에 추가
        if(!data) throw new Error("Queue: need parameter to push data");
        this.#list.push(data);
    };
    front() { // 가장 앞쪽 값을 받아옴
        if(!this.#list.length) throw new Error("Queue: need data to pop item");
        return this.#list.shift();
    };
    isEmpty() { // 길이가 0이면 true (비어있음)
        return !this.#list.length;
    }
};

module.exports = Queue;
