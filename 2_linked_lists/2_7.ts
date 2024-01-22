import { LinkedList, Node as LLNode } from "../models/linked_list";

export interface Solution {
  findIntersection(first: LinkedList, second: LinkedList): LLNode | null;
}

export class BruteForceSolution implements Solution {
  findIntersection(first: LinkedList, second: LinkedList): LLNode | null {
    if (first === second) {
      return null;
    }
    throw new Error();
  }
}

export const solutions = [new BruteForceSolution()];
