import { LinkedList, Node as LLNode } from "./linked_list";

describe("LinkedList", () => {
  describe("constructor", () => {
    it("can append multiple elements", () => {
      const list = new LinkedList(100, 200, 300);
      expect([...list]).toEqual([100, 200, 300]);
    });
  });

  describe("iterator protocol", () => {
    test("with an empty list", () => {
      const list = new LinkedList();
      const elements = [...list];
      expect(elements).toEqual([]);
    });

    test("with a non-empty list", () => {
      const list = new LinkedList(1, 2, 3);
      const elements = [...list];
      expect(elements).toEqual([1, 2, 3]);
    });
  });

  describe("nodes", () => {
    test("with an empty list", () => {
      const list = new LinkedList();
      expect([...list.nodes]).toEqual([]);
    });

    test("with a non-empty list", () => {
      const first = new LLNode(undefined);
      const second = new LLNode(undefined);
      first.next = second;
      const list = new LinkedList().appendNode(first);

      const elements = [...list.nodes];

      expect(elements).toEqual([first, second]);
    });
  });

  describe("head", () => {
    test("with an empty list", () => {
      expect(new LinkedList().head).toBe(undefined);
    });

    test("with multiple elements", () => {
      const head = new LLNode(1);
      const list = new LinkedList<number>().appendNode(head).append(1, 2);

      expect(list.head).toBe(head);
    });
  });

  describe("tail", () => {
    test("with an empty list", () => {
      expect(new LinkedList().tail).toBe(undefined);
    });

    test("with a single element", () => {
      expect(new LinkedList(1).tail).toEqual(new LLNode(1));
    });

    test("with multiple elements", () => {
      const last = new LLNode(3);
      const list = new LinkedList(1, 2).appendNode(last);

      expect(list.tail).toBe(last);
    });
  });

  describe("size", () => {
    test("with an empty list", () => {
      expect(new LinkedList().size).toBe(0);
    });

    test("with a single element", () => {
      expect(new LinkedList(1).size).toBe(1);
    });

    test("with multiple elements", () => {
      expect(new LinkedList(1, 2, 3).size).toBe(3);
    });
  });

  describe("get", () => {
    it("can get an existing element", () => {
      const list = new LinkedList<number>();
      list.append(1);
      expect(list.get(0)).toBe(1);
    });

    it("throws an error for a non-existent index", () => {
      const list = new LinkedList();
      expect(() => {
        list.get(0);
      }).toThrow(RangeError);
    });
  });

  describe("append", () => {
    test("on an empty list", () => {
      const list = new LinkedList<number>();
      list.append(1);
      expect(list.get(0)).toBe(1);
    });

    test("on a non-empty list", () => {
      const list = new LinkedList<number>();
      list.append(100);
      list.append(200);
      expect(list.get(1)).toBe(200);
    });

    it("is fluent", () => {
      const list = new LinkedList<number>();
      const actual = list.append(100);
      expect(actual).toBe(list);
    });

    it("can append multiple elements", () => {
      const list = new LinkedList<number>().append(1, 2, 3);
      expect([...list]).toEqual([1, 2, 3]);
    });
  });

  describe("appendNode", () => {
    test("on an empty list", () => {
      const list = new LinkedList<number>();
      const node = new LLNode(1);

      list.appendNode(node);

      expect(list.get(0)).toBe(1);
    });

    test("on a non-empty list", () => {
      const list = new LinkedList<number>(1);
      const second = new LLNode(2);

      list.appendNode(second);

      expect(list.get(1)).toBe(2);
    });

    it("is fluent", () => {
      const list = new LinkedList<undefined>();
      const actual = list.appendNode(new LLNode(undefined));
      expect(actual).toBe(list);
    });
  });
});
