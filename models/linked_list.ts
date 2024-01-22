export class LinkedList<TValue = undefined> implements Iterable<TValue> {
  private _head?: Node<TValue>;

  constructor(...values: TValue[]) {
    this.append(...values);
  }

  *[Symbol.iterator]() {
    for (const node of this.nodes) {
      yield node.value;
    }
  }

  get nodes() {
    return this.yieldNodes();
  }

  get head() {
    return this._head;
  }

  get tail() {
    let node;
    for (node of this.nodes) {
      continue;
    }
    return node;
  }

  get size() {
    let size = 0;
    for (const node of this.nodes) {
      size += 1;
    }
    return size;
  }

  get(index: number) {
    let i = 0;
    for (const node of this.nodes) {
      if (i === index) {
        return node.value;
      }
      i += 1;
    }
    throw new RangeError();
  }

  append(...values: TValue[]) {
    const extension = this.linkTogether(values);
    if (!extension) {
      return this;
    }
    return this.appendNode(extension);
  }

  appendNode(node: Node<TValue>) {
    if (!this._head) {
      this._head = node;
      return this;
    }

    this.tail!.next = node;
    return this;
  }

  private *yieldNodes() {
    let iNode = this._head;
    while (iNode) {
      yield iNode;
      iNode = iNode.next;
    }
  }

  private linkTogether(values: TValue[]): Node<TValue> | null {
    if (!values.length) {
      return null;
    }
    const head = new Node(values[0]);
    let tail = head;
    values
      .slice(1)
      .map((value) => new Node(value))
      .forEach((node) => {
        tail.next = node;
        tail = node;
      });
    return head;
  }
}

export class Node<TValue = undefined> {
  public value: TValue;
  public next?: this;

  constructor(value: TValue) {
    this.value = value;
  }
}
