import { LinkedList } from "../models/linked_list";
import { solutions } from "./2_7";

describe.each(solutions)("findIntersection", (solution) => {
  test("when passed in the same list two times", () => {
    const list = new LinkedList();
    const actual = solution.findIntersection(list, list);
    expect(actual).toBe(null);
  });

  test("given non-intersecting lists", () => {
    const first = new LinkedList();
    const second = new LinkedList();

    const actual = solution.findIntersection(first, second);

    expect(actual).toBe(null);
  });

  test("given intersecting lists", () => {
    const first = new LinkedList();
    const second = new LinkedList();
  });
});
