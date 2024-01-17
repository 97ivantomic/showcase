export class LinkedList<TValue> {
  constructor(public head?: Node<TValue>) {}
}

export class Node<TValue> {
  public value: TValue;
  public next?: this;

  constructor(value: TValue) {
    this.value = value;
  }

  withNext(next: this) {
    this.next = next;
    return this;
  }
}
