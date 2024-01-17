import { BinaryTree } from "../models/graph";
import { LinkedList, Node as LLNode } from "../models/linked_list";

import {
  MySolution,
  Solution,
  TheirBreadthFirstSolution,
  TheirPreOrderTraversalSolution,
} from "./4_3";

const solutions: Solution[] = [
  new MySolution(),
  // new TheirPreOrderTraversalSolution(),
  // new TheirBreadthFirstSolution()
];

describe.each(solutions)("createLinkedList", (solution) => {
  const name = solution.constructor.name;

  test(`${name}: with a single node`, () => {
    const given = BT(1);
    const actual = solution.createLinkedList(given);
    expect(actual).toEqual({ 0: LLN(BT(1)) });
  });

  test(`${name}: with two levels`, () => {
    const first = BT(1);
    const second = BT(2);
    const third = BT(3);
    const tree = first.withLeft(second).withRight(third);

    const actual = solution.createLinkedList(tree);

    expect(actual).toEqual({
      0: LLN(first),
      1: LLN(second).withNext(LLN(third)),
    });
  });
});

function BT(value: number) {
  return new BinaryTree(value);
}

function LList(head: LLNode<number>) {
  return new LinkedList(head);
}

function LLN(value: BinaryTree<number>) {
  return new LLNode(value);
}
