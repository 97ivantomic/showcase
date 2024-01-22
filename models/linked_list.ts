export class LinkedList<TValue = undefined> implements Iterable<TValue> {
  private _head?: Node<TValue>;
  private _tail?: Node<TValue>;
  private _size = 0;

  constructor(...values: TValue[]) {
    values.forEach(this.append.bind(this));
  }

  *[Symbol.iterator]() {
    for (const node of this.yieldNodes()) {
      yield node.value;
    }
  }

  get nodes() {
    return this.yieldNodes();
  }

  /**
   * Time: O(1)
   */
  get tail() {
    return this._tail;
  }

  /**
   * Time: O(1)
   */
  get size() {
    return this._size;
  }

  get(index: number) {
    let iNode = this._head;
    try {
      for (let i = 0; i < index; i++) {
        iNode = iNode!.next;
      }
      return iNode!.value;
    } catch (e) {
      throw new RangeError();
    }
  }

  /**
   * Time: O(1)
   */
  append(value: TValue) {
    return this.appendNode(new Node(value));
  }

  /**
   * Time: O(1)
   */
  appendNode(node: Node<TValue>) {
    return this._head
      ? this.appendNodeToTail(node)
      : this.initializeWithNode(node);
  }

  private initializeWithNode(node: Node<TValue>) {
    this._head = node;
    this._tail = node;
    this._size += 1;
    return this;
  }

  private appendNodeToTail(node: Node<TValue>) {
    this._tail!.next = node;
    this._tail = node;
    this._size += 1;
    return this;
  }

  private *yieldNodes() {
    let iNode = this._head;
    while (iNode) {
      yield iNode;
      iNode = iNode.next;
    }
  }
}

export class Node<TValue = undefined> {
  public value: TValue;
  public next?: this;

  constructor(value: TValue) {
    this.value = value;
  }
}
