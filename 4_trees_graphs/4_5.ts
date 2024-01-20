import { BinaryTree, visitBreadthFirst } from "../models/graph";

export interface Solution {
  isBinarySearchTree(tree: BinaryTree<number>): boolean;
}

/**
 * time: O(N^2) (?)
 * space: O(1)
 * where N = number of nodes
 * and without space taken by input
 */
export class BruteForceSolution implements Solution {
  isBinarySearchTree(tree: BinaryTree<number>): boolean {
    for (const { node } of visitBreadthFirst(tree)) {
      if (!this.leftBranchSatisfiesCondition(node)) {
        return false;
      }
      if (!this.rightBranchSatisfiesCondition(node)) {
        return false;
      }
    }
    return true;
  }

  private leftBranchSatisfiesCondition(tree: BinaryTree<number>): boolean {
    if (tree.left === undefined) {
      return true;
    }
    return tree.value > this.getMaximum(tree.left);
  }

  private rightBranchSatisfiesCondition(tree: BinaryTree<number>): boolean {
    if (tree.right === undefined) {
      return true;
    }
    return tree.value <= this.getMinimum(tree.right);
  }

  private getMaximum(tree: BinaryTree<number>): number {
    let max = Number.NEGATIVE_INFINITY;
    for (const { node } of visitBreadthFirst(tree)) {
      max = Math.max(node.value, max);
    }
    return max;
  }

  private getMinimum(tree: BinaryTree<number>): number {
    let min = Number.POSITIVE_INFINITY;
    for (const { node } of visitBreadthFirst(tree)) {
      min = Math.min(node.value, min);
    }
    return min;
  }
}

/**
 * time: O(N)
 * space: O(N)
 * where N = number of nodes
 */
export class OptimizedSolution implements Solution {
  nodeToMin = new Map<BinaryTree<number>, number>();
  nodeToMax = new Map<BinaryTree<number>, number>();

  isBinarySearchTree(tree: BinaryTree<number>): boolean {
    for (const { node } of visitBreadthFirst(tree)) {
      if (!this.leftBranchSatisfiesCondition(node)) {
        return false;
      }
      if (!this.rightBranchSatisfiesCondition(node)) {
        return false;
      }
    }
    return true;
  }

  private leftBranchSatisfiesCondition(tree: BinaryTree<number>): boolean {
    return tree.value > this.getMaximum(tree.left);
  }

  private rightBranchSatisfiesCondition(tree: BinaryTree<number>): boolean {
    return tree.value <= this.getMinimum(tree.right);
  }

  private getMaximum(tree: BinaryTree<number> | undefined): number {
    if (tree === undefined) {
      return Number.NEGATIVE_INFINITY;
    }

    if (this.nodeToMax.has(tree)) {
      return this.nodeToMin.get(tree) as number;
    }

    const leftBranchMax = this.getMaximum(tree.left);
    const rightBranchMax = this.getMaximum(tree.right);
    const max = Math.max(tree.value, leftBranchMax, rightBranchMax);

    this.nodeToMax.set(tree, max);
    return max;
  }

  private getMinimum(tree: BinaryTree<number> | undefined): number {
    if (tree === undefined) {
      return Number.POSITIVE_INFINITY;
    }
    if (this.nodeToMin.has(tree)) {
      return this.nodeToMin.get(tree) as number;
    }

    const leftBranchMin = this.getMinimum(tree.left);
    const rightBranchMin = this.getMinimum(tree.right);
    const min = Math.min(tree.value, leftBranchMin, rightBranchMin);

    this.nodeToMin.set(tree, min);
    return min;
  }
}

/**
 * time: O(nodes)
 * space: O(1)
 */
export class HintBasedSolution implements Solution {
  isBinarySearchTree(tree: BinaryTree<number>): boolean {
    return this.isTreeWithinRange(
      tree,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY,
    );
  }

  private isTreeWithinRange(
    tree: BinaryTree<number> | undefined,
    min: number,
    max: number,
  ): boolean {
    if (tree === undefined) {
      return true;
    }

    const isCurrentNodeWithinRange = tree.value >= min && tree.value < max;
    if (!isCurrentNodeWithinRange) {
      return false;
    }

    // const newLeftMax = Math.min(max, tree.value);
    // const newRightMin = Math.max(min, tree.value);
    const newLeftMax = tree.value;
    const newRightMin = tree.value;

    return (
      this.isTreeWithinRange(tree.left, min, newLeftMax) &&
      this.isTreeWithinRange(tree.right, newRightMin, max)
    );
  }
}

export const solutions = [
  new BruteForceSolution(),
  new OptimizedSolution(),
  new HintBasedSolution(),
];
