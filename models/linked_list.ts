export class LinkedList<TValue = undefined> implements Iterable<TValue> {
  private head?: Node<TValue>;
  private tail?: Node<TValue>;

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

  get(index: number) {
    let iNode = this.head;
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
    return this.head
      ? this.appendNodeToTail(node)
      : this.initializeWithNode(node);
  }

  private initializeWithNode(node: Node<TValue>) {
    this.head = node;
    this.tail = node;
    return this;
  }

  private appendNodeToTail(node: Node<TValue>) {
    this.tail!.next = node;
    this.tail = node;
    return this;
  }

  private *yieldNodes() {
    let iNode = this.head;
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
