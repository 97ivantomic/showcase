import { BinarySearchTree } from "../models/graph";
import {
  BruteForceSolution,
  OfficialSolution,
  WrongHintBasedSolution,
} from "./4_6";

const solutions = [
  new BruteForceSolution(),
  new WrongHintBasedSolution(),
  new OfficialSolution(),
];

describe.each(solutions)("getSuccessor", (solution) => {
  const name = solution.constructor.name;

  // (root)
  test(`${name}: of a single node`, () => {
    const node = BST(1);
    const successor = solution.getSuccessor(node);
    expect(successor).toBe(null);
  });

  // (root)
  //     \
  //      right(!)
  test(`${name}: of node with a single node as the right branch`, () => {
    const right = BST(2);
    const root = BST(1).withRight(right);
    const successor = solution.getSuccessor(root);
    expect(successor).toBe(right);
  });

  // (root)
  //     \
  //      middle
  //      /
  // left(!)
  test(`${name}: of node with a right branch which has a left branch`, () => {
    const left = BST(3);
    const root = BST(2).withRight(BST(4).withLeft(left));
    const successor = solution.getSuccessor(root);
    expect(successor).toBe(left);
  });

  // (root)
  //     \
  //      middle(!)
  //       \
  //        right
  test(`${name}: of node with a right branch which has a right branch`, () => {
    const middle = BST(3).withRight(BST(4));
    const root = BST(2).withRight(middle);
    const successor = solution.getSuccessor(root);
    expect(successor).toBe(middle);
  });

  //      root(!)
  //      /
  // (left)
  test(`${name}: of node in a left branch and without its own right branch`, () => {
    const left = BST(1);
    const root = BST(2).withLeft(left);
    const successor = solution.getSuccessor(left);
    expect(successor).toBe(root);
  });

  //      root(!)
  //     /
  // middle
  //     \
  //      (right)
  test(`${name}: of a node in a right branch and without own branches`, () => {
    const right = BST(2);
    const root = BST(3).withLeft(BST(2).withRight(right));
    const successor = solution.getSuccessor(right);
    expect(successor).toBe(root);
  });

  // root
  //    \
  //    (middle)
  //       \
  //       right(!)
  test(`${name}: of a node in a right branch and with its own right branch`, () => {
    const right = BST(4);
    const middle = BST(3).withRight(right);
    BST(2).withRight(middle);

    const successor = solution.getSuccessor(middle);

    expect(successor).toBe(right);
  });
});

function BST(value: number) {
  return new BinarySearchTree(value);
}
