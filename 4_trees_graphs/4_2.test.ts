import { BinaryTree, printTree } from "../models/graph";

import { MySolution, OfficialSolution, Solution } from "./4_2";

const solutions: Solution[] = [new MySolution(), new OfficialSolution()];

describe.each(solutions)("createBinarySearchTree", (solution) => {
  const name = solution.constructor.name;

  test(`${name}: with an empty array`, () => {
    const given: number[] = [];
    const tree = solution.createBinarySearchTree(given);
    expect(tree).toEqual(undefined);
  });

  test(`${name}: with a single element`, () => {
    const given = [1];
    const tree = solution.createBinarySearchTree(given);
    expect(tree).toEqual(new BinaryTree(1));
  });

  test(`${name}: with an odd number of elements`, () => {
    const given = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const tree = solution.createBinarySearchTree(given);
    expect(printTree(tree!)).toEqual("5 2 7 1 3 6 8 4 9");
  });

  test(`${name}: with an even number of elements`, () => {
    const given = [1, 2, 3, 4, 5, 6, 7, 8];
    const tree = solution.createBinarySearchTree(given);
    expect(printTree(tree!)).toEqual("4 2 6 1 3 5 7 8");
  });
});
