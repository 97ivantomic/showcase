import { Queue } from "./queue";

let q = new Queue();

beforeEach(() => {
  q = new Queue();
});

describe("enqueue", () => {
  it("can enqueue an element", () => {
    q.enqueue(1);
    expect(q.length).toBe(1);
  });
});

describe("dequeue", () => {
  it.skip("can dequeue an element in order of insertion", () => {
    q.enqueue(1);
    q.enqueue(2);

    expect(q.dequeue()).toBe(1);
    expect(q.length).toBe(1);
  });

  it("can dequeue all elements in order of insertion", () => {
    q.enqueue(1);
    q.enqueue(2);

    expect(q.dequeue()).toBe(1);
    expect(q.dequeue()).toBe(2);
    expect(q.length).toBe(0);
  });
});

describe("peek", () => {
  it("peeks the element which is next in line to be dequeued", () => {
    q.enqueue(1);
    q.enqueue(2);

    expect(q.peek()).toBe(1);
    expect(q.length).toBe(2);
  });
});

describe("length", () => {
  it("returns the current queue length after queueing and dequeing", () => {
    q.enqueue(1);
    q.enqueue(2);
    q.dequeue();

    expect(q.length).toBe(1);
  });
});

describe("isEmpty", () => {
  test("with an empty queue", () => {
    expect(q.isEmpty).toBe(true);
  });

  test("with a non-empty queue", () => {
    q.enqueue(1);
    expect(q.isEmpty).toBe(false);
  });
});

describe("hasElements", () => {
  test("with an empty queue", () => {
    expect(q.hasElements).toBe(false);
  });

  test("with a non-empty queue", () => {
    q.enqueue(1);
    expect(q.hasElements).toBe(true);
  });
});
