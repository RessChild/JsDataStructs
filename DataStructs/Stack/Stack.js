class Stack {
    #list = [];
    push(data) { this.#list.push(data); }
    pop() { return this.#list.pop(); }
    isEmpty() { return !this.#list.length; }
}

module.exports = Stack;