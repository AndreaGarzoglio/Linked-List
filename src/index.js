import "./styles.css";

class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const newNode = new Node(value);
    let current = this.head;
    if (current === null) {
      this.head = newNode;
      return;
    } else {
      while (current.nextNode !== null) {
        current = current.nextNode;
      }
      current.nextNode = newNode;
    }
  }
  prepend(value) {
    const newNode = new Node(value);
    newNode.nextNode = this.head;
    this.head = newNode;
  }
  size() {
    let current = this.head;
    let counter = 0;
    while (current !== null) {
      counter++;
      current = current.nextNode;
    }
    return counter;
  }

  head() {
    return this.head?.value;
  }

  tail() {
    let current = this.head;
    if (this.head === null) return undefined;
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return current.value;
  }

  at(index) {
    let current = this.head;
    let counter = 0;
    while (current !== null) {
      if (counter === index) return current.value;
      counter++;
      current = current.nextNode;
    }
    return undefined;
  }
  pop() {
    if (this.head === null) return undefined;
    let result = this.head.value;
    this.head = this.head.nextNode;
    return result;
  }
  contains(value) {
    let current = this.head;
    while (current !== null) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }
  findIndex(value) {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      if (current.value === value) return index;
      index++;
      current = current.nextNode;
    }
    return -1;
  }

  toString() {
    if (this.head === null) return "";
    let current = this.head;
    let result = "";
    while (current !== null) {
      result += `( ${current.value} )-> `;
      current = current.nextNode;
    }
    result += "null";
    return result;
  }
  insertAt(index, ...values) {
    if (index < 0 || index > this.size())
      throw new RangeError("The index is out of bounds.");

    const newNodes = values.map((v) => new Node(v));
    for (let i = 0; i < newNodes.length - 1; i++) {
      newNodes[i].nextNode = newNodes[i + 1];
    }

    let chainHead = newNodes[0];
    let chainTail = newNodes[newNodes.length - 1];
    if (index === 0) {
      chainTail.nextNode = this.head;
      this.head = chainHead;
      return;
    }

    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.nextNode;

    chainTail.nextNode = prev.nextNode;
    prev.nextNode = chainHead;
  }
  removeAt(index) {
    if (index < 0 || index >= this.size())
      throw new RangeError("The index is out of bounds.");
    if (index === 0) {
      this.head = this.head.nextNode;
      return;
    }
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.nextNode;
    let next = prev.nextNode.nextNode;
    prev.nextNode = next;
  }
}

export { LinkedList };
