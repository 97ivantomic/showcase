import { LinkedList, Node as LLNode } from "../models/linked_list";
import { solutions } from "./2_7";

describe.each(solutions)("findIntersection", (solution) => {
  const name = solution.constructor.name;

  test(`${name}: when passed in the same list two times`, () => {
    const list = new LinkedList();
    const actual = solution.findIntersection(list, list);
    expect(actual).toBe(null);
  });

  test(`${name}: given two empty lists`, () => {
    const first = new LinkedList();
    const second = new LinkedList();

    const actual = solution.findIntersection(first, second);

    expect(actual).toBe(null);
  });

  test(`${name}: given intersecting lists of same size`, () => {
    const commonNode = new LLNode(100);
    const first = new LinkedList(1, 2, 3);
    const second = new LinkedList<number>(5, 6, 7);
    first.appendNode(commonNode);
    second.appendNode(commonNode);

    const actual = solution.findIntersection(first, second);

    expect(actual).toBe(commonNode);
  });

  test(`${name}: given intersecting lists of different sizes`, () => {
    const commonNode = new LLNode(100);
    const first = new LinkedList(1, 2, 3);
    const second = new LinkedList<number>(5);
    first.appendNode(commonNode);
    second.appendNode(commonNode);

    const actual = solution.findIntersection(first, second);

    expect(actual).toBe(commonNode);
  });

  test(`${name}: given non-intersecting lists of different sizes`, () => {
    const first = new LinkedList(1, 2, 3, 4);
    const second = new LinkedList(5, 6, 7);

    const actual = solution.findIntersection(first, second);

    expect(actual).toBe(null);
  });
});
