import { BinaryTree, visitBreadthFirst } from "../models/graph";

export interface Solution {
  /**
   * Best concievable runtime: O(N) where N = number of nodes.
   */
  isBalanced(tree: BinaryTree): boolean;
}

export class BruteForceSolution implements Solution {
  isBalanced(tree: BinaryTree): boolean {
    for (const { node } of visitBreadthFirst(tree)) {
      const leftBranchSize = this.getBranchSize(node.left);
      const rightBranchSize = this.getBranchSize(node.right);
      const sizeDifference = Math.abs(leftBranchSize - rightBranchSize);
      if (sizeDifference > 1) {
        return false;
      }
    }
    return true;
  }

  private getBranchSize(tree: BinaryTree | undefined): number {
    if (tree === undefined) {
      return 0;
    }

    let maxDepth = 0;
    for (const { node, distance } of visitBreadthFirst(tree)) {
      maxDepth = Math.max(maxDepth, distance);
    }

    const maxSize = maxDepth + 1;
    return maxSize;
  }
}

export class TopDownSolution implements Solution {
  nodeToHeight = new Map<BinaryTree, number>();

  /**
   * time: O(N)
   * space: O(N)
   * where N = number of nodes
   */
  isBalanced(tree: BinaryTree): boolean {
    for (const { node } of visitBreadthFirst(tree)) {
      const leftBranchHeight = this.getBranchHeight(node.left, node);
      const rightBranchHeight = this.getBranchHeight(node.right, node);
      const heightDifference = Math.abs(leftBranchHeight - rightBranchHeight);
      if (heightDifference > 1) {
        return false;
      }

      const height = Math.max(leftBranchHeight, rightBranchHeight);
      this.nodeToHeight.set(node, height);
    }
    return true;
  }

  private getBranchHeight(
    tree: BinaryTree | undefined,
    parent: BinaryTree,
  ): number {
    if (tree === undefined) {
      return 0;
    }
    if (this.nodeToHeight.has(parent)) {
      return (this.nodeToHeight.get(parent) as number) - 1;
    }

    let maxDepth = 0;
    for (const { node, distance } of visitBreadthFirst(tree)) {
      maxDepth = Math.max(maxDepth, distance);
    }

    const maxHeight = maxDepth + 1;
    return maxHeight;
  }
}

/**
 * @todo
 */
export class BottomUpSolution implements Solution {
  isBalanced(tree: BinaryTree): boolean {
    const leftInfo = this.getInfo(tree.left);
    const rightInfo = this.getInfo(tree.right);
    if (!leftInfo.isBalanced || !rightInfo.isBalanced) {
      return false;
    }
    const heightDiff = Math.abs(leftInfo.height - rightInfo.height);
    return heightDiff > 1;
  }

  private getInfo(tree: BinaryTree | undefined) {
    if (tree === undefined) {
      return { height: 0, isBalanced: true };
    }

    const leftInfo = this.getInfo(tree.left);
    const rightInfo = this.getInfo(tree.right);
    // if (leftInfo !== undefined && !leftInfo.isBalanced) {
    //   return { isBalanced: false }
    // }

    throw new Error("Not implemented.");
  }
}
