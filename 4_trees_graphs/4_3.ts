import { BinaryTree, visitBreadthFirst } from "../models/graph";
import { LinkedList } from "../models/linked_list";

export interface Solution {
  createLinkedList(tree: BinaryTree<number>): LevelToNodes;
}

export interface LevelToNodes {
  [x: number]: LinkedList<BinaryTree<number>>;
}

/**
 * time: O(N)
 * space: O(N)
 * where N = the number of tree nodes
 */
export class MySolution implements Solution {
  createLinkedList(tree: BinaryTree<number>): LevelToNodes {
    // space: O(tree depth)
    const levelToNodes: LevelToNodes = {};

    // time: O(tree nodes)
    // space: O(tree nodes)
    for (const { node, distance: level } of visitBreadthFirst(tree)) {
      if (levelToNodes[level] === undefined) {
        levelToNodes[level] = new LinkedList();
      }
      levelToNodes[level].append(node);
    }

    return levelToNodes;
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
