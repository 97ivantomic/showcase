import { Queue } from "../queue";

import { BinaryTree } from "./tree";

export function* visitInOrder<TValue, TTree extends BinaryTree<TValue>>(
  tree: TTree,
): Generator<TTree> {
  if (tree.left) {
    yield* visitInOrder(tree.left);
  }
  yield tree;
  if (tree.right) {
    yield* visitInOrder(tree.right);
  }
}

export interface Searchable {
  readonly adjacent: Set<this>;
}

export interface NodeWithDistance<TNode> {
  node: TNode;
  distance: number;
}

export function* visitBreadthFirst<TNode extends Searchable>(
  origin: TNode,
): Generator<NodeWithDistance<TNode>> {
  const nodesEnqueuedOnce = new Set<TNode>();
  const queue = new Queue<NodeWithDistance<TNode>>();

  function enqueue({ node, distance }: NodeWithDistance<TNode>) {
    queue.enqueue({ node, distance });
    nodesEnqueuedOnce.add(node);
  }
  function enqueueIfNeeded({ node, distance }: NodeWithDistance<TNode>) {
    if (nodesEnqueuedOnce.has(node)) {
      return;
    }
    enqueue({ node, distance });
  }

  enqueue({ node: origin, distance: 0 });

  while (queue.hasElements) {
    const { node, distance } = queue.dequeue();
    yield { node, distance };
    node.adjacent.forEach((adjacent) => {
      enqueueIfNeeded({ node: adjacent, distance: distance + 1 });
    });
  }
}
