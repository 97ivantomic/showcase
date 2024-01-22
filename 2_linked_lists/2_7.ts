import { LinkedList, Node as LLNode } from "../models/linked_list";

export interface Solution {
  findIntersection<TValue>(
    first: LinkedList<TValue>,
    second: LinkedList<TValue>,
  ): LLNode<TValue> | null;
}

/**
 * Time: O(F + S)
 * Aux. space: O(F + S)
 * where F = size of the first linked list
 *   and S = size of the second linked list
 */
export class FirstBruteForceSolution implements Solution {
  findIntersection<V>(first: LinkedList<V>, second: LinkedList<V>) {
    if (first === second) {
      return null;
    }

    // time: O(F + S)
    // space: O(F + S)
    const firstNodes = [...first.nodes];
    const secondNodes = [...second.nodes];

    // time: O(F)
    // space: O(F)
    const firstSet = new Set(firstNodes);

    // time: O(S)
    return secondNodes.find((node) => firstSet.has(node)) ?? null;
  }
}

/**
 * Time: O(F + S)
 * Aux. space: O(F)
 * where F = size of the first linked list
 *   and S = size of the second linked list
 */
export class SecondBruteForceSolution implements Solution {
  findIntersection<V>(first: LinkedList<V>, second: LinkedList<V>) {
    if (first === second) {
      return null;
    }

    // time: O(F)
    // space: O(F)
    const firstNodes = [...first.nodes];
    const firstSet = new Set(firstNodes);

    // time: O(S)
    for (const node of second.nodes) {
      if (firstSet.has(node)) {
        return node;
      }
    }

    return null;
  }
}

/**
 * Time: O(F + S)
 * Aux. space: none
 * where F = size of the first linked list
 *   and S = size of the second linked list
 */
export class TailBasedSolution implements Solution {
  findIntersection<V>(first: LinkedList<V>, second: LinkedList<V>) {
    if (first === second) {
      return null;
    }

    const firstTail = first.tail;
    const secondTail = second.tail;

    for (const candidate of first.nodes) {
      if (candidate === secondTail) {
        return candidate;
      }
    }
    for (const candidate of second.nodes) {
      if (candidate === firstTail) {
        return candidate;
      }
    }
    return null;
  }
}

/**
 * Time: O(N)
 * Aux. space: none
 * where N = size of the larger linked list
 */
export class HintBasedSolution implements Solution {
  findIntersection<V>(first: LinkedList<V>, second: LinkedList<V>) {
    if (first === second) {
      return null;
    }

    const [smaller, larger] = this.sortBySize([first, second]);
    const sizeDifference = larger.size - smaller.size;

    const largerIterator = larger.nodes;
    const smallerIterator = smaller.nodes;

    this.moveAhead({ iterator: largerIterator, times: sizeDifference });

    for (let i = 0; i < smaller.size; i++) {
      const smallerNode = smallerIterator.next().value;
      const largerNode = largerIterator.next().value;
      if (smallerNode === largerNode) {
        return smallerNode as LLNode<V>;
      }
    }
    return null;
  }

  private moveAhead<V>({
    iterator,
    times,
  }: {
    iterator: Iterator<LLNode<V>>;
    times: number;
  }) {
    for (let i = 0; i < times; i++) {
      iterator.next();
    }
  }

  private sortBySize<V>(lists: LinkedList<V>[]) {
    return lists.sort((a, b) => (a.size < b.size ? -1 : 1));
  }
}

export const solutions = [
  new FirstBruteForceSolution(),
  new SecondBruteForceSolution(),
  new TailBasedSolution(),
  new HintBasedSolution(),
];
