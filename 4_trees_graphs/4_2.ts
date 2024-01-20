import { BinaryTree } from "../models/graph";

export interface Solution {
  createBinarySearchTree(sorted: number[]): BinaryTree<number> | undefined;
}

export class MySolution implements Solution {
  createBinarySearchTree(sorted: number[]) {
    const length = sorted.length;

    if (!length) {
      return undefined;
    }
    if (length === 1) {
      const number = sorted[0];
      return new BinaryTree(number);
    }

    const middleIndex = Math.floor((length - 1) / 2);
    const middleValue = sorted[middleIndex];
    const node = new BinaryTree(middleValue);

    const leftRemainder = sorted.slice(0, middleIndex);
    const rightRemainder = sorted.slice(middleIndex + 1);

    node.left = this.createBinarySearchTree(leftRemainder);
    node.right = this.createBinarySearchTree(rightRemainder);

    return node;
  }
}

export class OfficialSolution implements Solution {
  createBinarySearchTree(sorted: number[]) {
    return this._createBinarySearchTree(sorted, 0, sorted.length - 1);
  }

  private _createBinarySearchTree(
    sorted: number[],
    start: number,
    end: number,
  ) {
    if (end < start) {
      return undefined;
    }

    const middleIndex = Math.floor((start + end) / 2);
    const middleValue = sorted[middleIndex];
    const node = new BinaryTree(middleValue);

    node.left = this._createBinarySearchTree(sorted, start, middleIndex - 1);
    node.right = this._createBinarySearchTree(sorted, middleIndex + 1, end);

    return node;
  }
}

export const solutions = [new MySolution(), new OfficialSolution()];
