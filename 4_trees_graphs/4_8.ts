import { BinaryTree } from "../models/graph";

export interface Solution {
  /**
   * Avoid storing nodes in additional data structures.
   */
  findFirstCommonAncestor(
    first: BinaryTree,
    second: BinaryTree,
  ): BinaryTree | null;
}

export class BruteForceSolution implements Solution {
  findFirstCommonAncestor(
    first: BinaryTree,
    second: BinaryTree,
  ): BinaryTree<undefined> | null {
    if (first === second) {
      return null;
    }
    const deeper = this.getDeeper(first, second);

    throw new Error("Not implemented.");
  }

  getDeeper(first: BinaryTree, second: BinaryTree): BinaryTree {
    throw new Error();
  }
}

export const solutions = [new BruteForceSolution()];
