import { BinaryTree } from "../models/graph";

import {
  TopDownSolution,
  BruteForceSolution,
  Solution,
  // BottomUpSolution,
} from "./4_4";

const solutions: Solution[] = [
  new BruteForceSolution(),
  new TopDownSolution(),
  // new BottomUpSolution(),
];

describe.each(solutions)("isBalanced", (solution) => {
  const name = solution.constructor.name;

  test(`${name}: with a single node`, () => {
    const tree = BT();
    const actual = solution.isBalanced(tree);
    expect(actual).toBe(true);
  });

  test(`${name}: with two levels and balanced`, () => {
    const tree = BT().withLeft(BT());
    const actual = solution.isBalanced(tree);
    expect(actual).toBe(true);
  });

  test(`${name}: with three levels and balanced`, () => {
    const leftBranch = BT().withLeft(BT());
    const rightBranch = BT();
    const tree = BT().withLeft(leftBranch).withRight(rightBranch);

    const actual = solution.isBalanced(tree);

    expect(actual).toBe(true);
  });

  test(`${name}: with three levels and imbalanced`, () => {
    const tree = BT().withLeft(BT().withLeft(BT()));
    const actual = solution.isBalanced(tree);
    expect(actual).toBe(false);
  });
});

function BT() {
  return new BinaryTree(undefined);
}
