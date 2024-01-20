import { BinaryTree } from "../models/graph";

import { solutions } from "./4_5";

describe.each(solutions)("isBinarySearchTree", (solution) => {
  const name = solution.constructor.name;

  test(`${name}: a single node`, () => {
    const tree = BT(1);
    const actual = solution.isBinarySearchTree(tree);
    expect(actual).toBe(true);
  });

  test(`${name}: a search tree with two levels`, () => {
    const tree = BT(2).withLeft(BT(1)).withRight(BT(3));
    const actual = solution.isBinarySearchTree(tree);
    expect(actual).toBe(true);
  });

  test(`${name}: with repeating values`, () => {
    const tree = BT(2).withRight(BT(2));
    const actual = solution.isBinarySearchTree(tree);
    expect(actual).toBe(true);
  });

  test(`${name}: with a broken maximum inside the left branch`, () => {
    const leftBranch = BT(2).withLeft(BT(3));
    const tree = BT(100).withLeft(leftBranch);
    const actual = solution.isBinarySearchTree(tree);
    expect(actual).toBe(false);
  });

  test(`${name}: with a broken minimum inside the right branch`, () => {
    const rightBranch = BT(100).withRight(BT(50));
    const tree = BT(1).withRight(rightBranch);
    const actual = solution.isBinarySearchTree(tree);
    expect(actual).toBe(false);
  });

  test(`${name}: with a broken maximum deeper in the left branch compared to the root`, () => {
    const leftBranch = BT(50).withRight(BT(150));
    const tree = BT(100).withLeft(leftBranch);
    const actual = solution.isBinarySearchTree(tree);
    expect(actual).toBe(false);
  });

  test(`${name}: with a broken minimum deeper in the right branch compared to the root`, () => {
    const rightBranch = BT(200).withLeft(BT(50));
    const tree = BT(100).withRight(rightBranch);
    const actual = solution.isBinarySearchTree(tree);
    expect(actual).toBe(false);
  });
});

function BT(value: number) {
  return new BinaryTree(value);
}
