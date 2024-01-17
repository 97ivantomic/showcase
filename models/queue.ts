// What about a linked list implementation?

export class Queue<T> {
  private data: T[] = [];

  enqueue(element: T) {
    this.data.push(element);
  }

  dequeue() {
    // return this.data.shift();
    const element = this.data[0];
    this.data = this.data.slice(1);
    return element;
  }

  peek() {
    return this.data[0];
  }

  get length() {
    return this.data.length;
  }

  get isEmpty() {
    return this.length === 0;
  }

  get hasElements() {
    return !this.isEmpty;
  }
}
