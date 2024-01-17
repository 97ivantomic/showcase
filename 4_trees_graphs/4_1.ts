import { GraphNode, Searchable, visitBreadthFirst } from "../models/graph";

export interface Solution {
  existsPath(node1: GraphNode, node2: GraphNode): boolean;
}

export class BruteForceSolution implements Solution {
  existsPath(node1: Searchable, node2: Searchable) {
    for (const { node: candidate } of visitBreadthFirst(node1)) {
      if (candidate === node2) {
        return true;
      }
    }
    return false;
  }
}

/**
 * @todo finish and uncomment tests
 * @todo search layer by layer
 */
export class BidirectionalSearchSolution implements Solution {
  existsPath(node1: Searchable, node2: Searchable) {
    const seen1 = new Set<Searchable>();
    const seen2 = new Set<Searchable>();
    const generator1 = visitBreadthFirst(node1);
    const generator2 = visitBreadthFirst(node2);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const next1 = generator1.next();
      const next2 = generator2.next();
      if (next1.done && next2.done) {
        return false;
        // return seen1.isDisjointFrom(seen2);
      }

      if (!next1.done) {
        const { node } = next1.value;
        seen1.add(node);

        if (seen2.has(node)) {
          return true;
        }
      }

      if (!next2.done) {
        const { node } = next2.value;
        seen2.add(node);
      }
    }
  }
}
