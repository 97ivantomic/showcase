import { LinkedList, Node } from "./linked_list";

describe("LinkedList", () => {
  describe("constructor", () => {
    it("can append multiple elements", () => {
      const list = new LinkedList(100, 200, 300);
      expect(list.get(2)).toBe(300);
    });
  });

  describe("iterator protocol", () => {
    it("is implemented", () => {
      const list = new LinkedList(1, 2, 3);
      const elements = [...list];
      expect(elements).toEqual([1, 2, 3]);
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
  });
});
