// An annotated copy of the LinkedList/Node classes, shown in the
// "how it works" modal. Kept separate from index.js so the real,
// uncommented source stays clean while this stays purely explanatory.

const LINKEDLIST_SOURCE = `class Node {
  constructor(value) {
    // Each node just holds a value and a pointer to the next node (or
    // null, if it's the last one).
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    // The list only ever needs to remember its first node; every other
    // node is reached by following nextNode links from there.
    this.head = null;
  }

  append(value) {
    const newNode = new Node(value);
    let current = this.head;
    if (current === null) {
      // Empty list: the new node becomes the head.
      this.head = newNode;
      return;
    } else {
      // Walk to the last node (the one whose nextNode is null)...
      while (current.nextNode !== null) {
        current = current.nextNode;
      }
      // ...and attach the new node after it.
      current.nextNode = newNode;
    }
  }

  prepend(value) {
    const newNode = new Node(value);
    // The new node points at the current head, then becomes the head
    // itself: an O(1) insert at the front.
    newNode.nextNode = this.head;
    this.head = newNode;
  }

  size() {
    // Counting means walking the whole list: there's no separate
    // length field to keep in sync.
    let current = this.head;
    let counter = 0;
    while (current !== null) {
      counter++;
      current = current.nextNode;
    }
    return counter;
  }

  tail() {
    let current = this.head;
    if (this.head === null) return undefined;
    // Walk to the end: the last node is the one with no nextNode.
    while (current.nextNode !== null) {
      current = current.nextNode;
    }
    return current.value;
  }

  at(index) {
    // Walk node by node, counting as we go, until the index matches.
    let current = this.head;
    let counter = 0;
    while (current !== null) {
      if (counter === index) return current.value;
      counter++;
      current = current.nextNode;
    }
    return undefined; // index was out of range
  }

  pop() {
    if (this.head === null) return undefined;
    // Removing the head is just re-pointing it at the second node.
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
    return -1; // not found
  }

  toString() {
    // Renders the list as "( a )-> ( b )-> ( c )-> null", which is what
    // the state line at the top of the app shows.
    if (this.head === null) return "";
    let current = this.head;
    let result = "";
    while (current !== null) {
      result += \`( \${current.value} )-> \`;
      current = current.nextNode;
    }
    result += "null";
    return result;
  }

  insertAt(index, ...values) {
    if (index < 0 || index > this.size())
      throw new RangeError("The index is out of bounds.");

    // Build the new values into their own little chain first...
    const newNodes = values.map((v) => new Node(v));
    for (let i = 0; i < newNodes.length - 1; i++) {
      newNodes[i].nextNode = newNodes[i + 1];
    }

    let chainHead = newNodes[0];
    let chainTail = newNodes[newNodes.length - 1];
    if (index === 0) {
      // Inserting at the front is just like prepend(), but for a chain.
      chainTail.nextNode = this.head;
      this.head = chainHead;
      return;
    }

    // Walk to the node just before the insertion point...
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.nextNode;

    // ...then splice the chain in between it and its old next node.
    chainTail.nextNode = prev.nextNode;
    prev.nextNode = chainHead;
  }

  removeAt(index) {
    if (index < 0 || index >= this.size())
      throw new RangeError("The index is out of bounds.");
    if (index === 0) {
      // Removing the head: just skip over it, like pop().
      this.head = this.head.nextNode;
      return;
    }
    // Walk to the node just before the one being removed...
    let prev = this.head;
    for (let i = 0; i < index - 1; i++) prev = prev.nextNode;
    // ...then skip over the removed node entirely.
    let next = prev.nextNode.nextNode;
    prev.nextNode = next;
  }
}`;

export { LINKEDLIST_SOURCE };
