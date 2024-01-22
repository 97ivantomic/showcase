export class LinkedList<TValue = undefined> implements Iterable<TValue> {
  private head?: Node<TValue>;
  private tail?: Node<TValue>;

  constructor(...values: TValue[]) {
    values.forEach(this.append.bind(this));
  }

  *[Symbol.iterator]() {
    let iNode = this.head;
    while (iNode) {
      yield iNode.value;
      iNode = iNode.next;
    }
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
    if (!this.head) {
      this.initializeWithValue(value);
      return this;
    }

    this.appendToTail(value);
    return this;
  }

  private initializeWithValue(value: TValue) {
    const node = new Node(value);
    this.head = node;
    this.tail = node;
  }

  private appendToTail(value: TValue) {
    const node = new Node(value);
    this.tail!.next = node;
    this.tail = node;
  }
}

export class Node<TValue = undefined> {
  public value: TValue;
  public next?: this;

  constructor(value: TValue) {
    this.value = value;
  }
}
