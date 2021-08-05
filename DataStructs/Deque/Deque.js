class Deque {
    #list=[]; // Deque 정보
    pushFront (data) {
        this.#list.unshift(data);
    }
    pushBack (data) {
        this.#list.push(data);
    }
    popFront () {
        return this.#list.shift();
    }
    popBack () {
        return this.#list.pop();
    }
    isEmpty () { return !this.#list.length; }
};

module.exports = Deque;