import { BinaryTree, visitBreadthFirst } from "../models/graph";
import { Node as LLNode } from "../models/linked_list";

export interface Solution {
  createLinkedList(tree: BinaryTree<number>): LevelToNodes;
}

export interface LevelToNodes {
  [x: number]: LLNode<BinaryTree<number>>;
}

/**
 * time: O(N)
 * space: O(N)
 * where N = the number of tree nodes
 */
export class MySolution implements Solution {
  createLinkedList(tree: BinaryTree<number>): LevelToNodes {
    // space: O(tree depth)
    const levelToTail: LevelToNodes = {};
    const levelToHead: LevelToNodes = {};

    // time: O(tree nodes)
    // space: O(tree nodes)
    for (const { node: treeNode, distance: level } of visitBreadthFirst(tree)) {
      const linkedListNode = new LLNode(treeNode);

      if (levelToTail[level] === undefined) {
        levelToTail[level] = linkedListNode;
        levelToHead[level] = linkedListNode;
        continue;
      }

      levelToTail[level].next = linkedListNode;
      levelToTail[level] = linkedListNode;
    }

    return levelToHead;
  }
}

export class TheirPreOrderTraversalSolution implements Solution {
  createLinkedList(tree: BinaryTree<number>): LevelToNodes {
    throw new Error();
  }
}

export class TheirBreadthFirstSolution implements Solution {
  createLinkedList(tree: BinaryTree<number>): LevelToNodes {
    throw new Error();
  }
}

export const solutions = [new MySolution()];
