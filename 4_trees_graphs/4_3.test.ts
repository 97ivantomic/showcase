import { BinaryTree } from "../models/graph";
import { LinkedList } from "../models/linked_list";

import { solutions } from "./4_3";

describe.each(solutions)("createLinkedList", (solution) => {
  const name = solution.constructor.name;

  test(`${name}: with a single node`, () => {
    const given = BT(1);
    const actual = solution.createLinkedList(given);
    expect(actual).toEqual({ 0: new LinkedList(given) });
  });

  test(`${name}: with two levels`, () => {
    const first = BT(1);
    const second = BT(2);
    const third = BT(3);
    const tree = first.withLeft(second).withRight(third);

    const actual = solution.createLinkedList(tree);

    expect(actual).toEqual({
      0: new LinkedList(first),
      1: new LinkedList(second).append(third),
    });
  });
});

function BT(value: number) {
  return new BinaryTree(value);
}
