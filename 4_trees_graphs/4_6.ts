import { BinarySearchTree, visitInOrder } from "../models/graph";

export interface Solution {
  getSuccessor(node: BinarySearchTree<number>): BinarySearchTree<number> | null;
}

/**
 * time: O(nodes)
 * space: O(nodes)
 */
export class BruteForceSolution implements Solution {
  getSuccessor(
    node: BinarySearchTree<number>,
  ): BinarySearchTree<number> | null {
    const root = this.getRoot(node);
    const inOrder = [...visitInOrder(root)];
    const nodeIndex = inOrder.indexOf(node);

    const isLast = nodeIndex === inOrder.length - 1;
    if (isLast) {
      return null;
    }

    return inOrder[nodeIndex + 1];
  }

  private getRoot(node: BinarySearchTree<number>): BinarySearchTree<number> {
    if (!node.parent) {
      return node;
    }
    return this.getRoot(node.parent);
  }
}

/**
 * time: O(log(nodes)) = O(depth)
 * aux. space: O(log(nodes)) = O(depth)
 */
export class WrongHintBasedSolution implements Solution {
  getSuccessor(
    node: BinarySearchTree<number>,
  ): BinarySearchTree<number> | null {
    const isRightBranch = node?.parent?.right === node;
    const isLeftBranch = node?.parent?.left === node;
    const hasRightBranch = node.right !== undefined;
    const hasParent = node.parent !== undefined;

    if (!hasRightBranch && !hasParent) {
      return null;
    }
    if (!hasRightBranch && isLeftBranch) {
      return node.parent!;
    }
    // nope.
    if (!hasRightBranch && isRightBranch) {
      return node.parent!.parent!;
    }
    for (const candidate of visitInOrder(node.right!)) {
      return candidate;
    }
    throw new Error();
  }
}

export class OfficialSolution implements Solution {
  getSuccessor(
    node: BinarySearchTree<number>,
  ): BinarySearchTree<number> | null {
    if (node.right) {
      return this.getLeftmostChild(node.right);
    }
    let inode = node;
    let parent = node.parent;
    // go up until we're on the left instead of right
    while (parent && parent.left !== inode) {
      inode = parent;
      parent = parent.parent;
    }
    return parent ?? null;
  }

  private getLeftmostChild(
    node: BinarySearchTree<number>,
  ): BinarySearchTree<number> {
    let leftmost = node;
    while (leftmost.left !== undefined) {
      leftmost = leftmost.left;
    }
    return leftmost;
  }
}
