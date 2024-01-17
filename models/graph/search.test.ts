import { GraphNode } from "./graph";
import { BinaryTree } from "./tree";
import {
  visitInOrder,
  visitBreadthFirst,
  NodeWithDistance,
  Searchable,
} from "./search";

describe("visitInOrder", () => {
  test("with a single node", () => {
    const tree = BT(1);
    const nodesInOrder = [...visitInOrder(tree)];
    expect(nodesInOrder).toEqual([tree]);
  });

  test("with tree levels", () => {
    const tree = BT(4)
      .withLeft(BT(2).withLeft(BT(1)).withRight(BT(3)))
      .withRight(BT(6).withLeft(BT(5)).withRight(BT(7)));
    const valuesInOrder = [...visitInOrder(tree)].map((t) => t.value);
    expect(valuesInOrder).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
});

describe("visitBreadthFirst", () => {
  it("includes the origin node", () => {
    const origin = new GraphNode();
    assertNodeInIterable(origin, visitBreadthFirst(origin));
  });

  it("excludes a node not connected to the target", () => {
    const origin = new GraphNode();
    const target = new GraphNode();

    assertNodeNotInIterable(target, visitBreadthFirst(origin));
  });

  // A --> B
  it("includes a node directly connected to the target", () => {
    const origin = new GraphNode();
    const target = new GraphNode();
    origin.link(target);

    assertNodeInIterable(target, visitBreadthFirst(origin));
  });

  // A <-- B
  it("excludes a node connected to the target in the other direction", () => {
    const origin = new GraphNode();
    const target = new GraphNode();
    target.link(origin);

    assertNodeNotInIterable(target, visitBreadthFirst(origin));
  });

  // // A --> B --> C
  it("includes a node connected to the target through an intermediary", () => {
    const origin = new GraphNode();
    const intermediary = new GraphNode();
    const target = new GraphNode();
    origin.link(intermediary);
    intermediary.link(target);

    assertNodeInIterable(target, visitBreadthFirst(origin));
  });

  // // A <--> B --> C
  it("can handle a cycle on the root node", () => {
    const origin = new GraphNode();
    const second = new GraphNode();
    const target = new GraphNode();
    origin.link(second);
    second.link(origin);
    second.link(target);

    assertNodeInIterable(target, visitBreadthFirst(origin));
  });

  // // A --> B <--> C
  it("can handle a cycle outside the root node", () => {
    const origin = new GraphNode();
    const second = new GraphNode();
    const third = new GraphNode();
    const target = new GraphNode();
    origin.link(second);
    second.link(third);
    third.link(second);
    third.link(target);

    assertNodeInIterable(target, visitBreadthFirst(origin));
  });

  it("also yields the distance from the origin", () => {
    const origin = new GraphNode();
    const second = new GraphNode();
    const third = new GraphNode();
    origin.link(second);
    second.link(third);

    [
      { node: origin, distance: 0 },
      { node: second, distance: 1 },
      { node: third, distance: 2 },
    ].forEach((node) => {
      assertNodeWithDistanceInIterable(node, visitBreadthFirst(origin));
    });
  });
});

function assertNodeInIterable(
  needle: Searchable,
  haystack: Iterable<NodeWithDistance<Searchable>>,
) {
  for (const { node: candidate } of haystack) {
    if (candidate === needle) {
      return;
    }
  }

  throw new Error();
}

function assertNodeWithDistanceInIterable(
  needle: NodeWithDistance<Searchable>,
  haystack: Iterable<NodeWithDistance<Searchable>>,
) {
  for (const { node, distance } of haystack) {
    if (node === needle.node && distance === needle.distance) {
      return;
    }
  }

  throw new Error();
}

function assertNodeNotInIterable(
  needle: Searchable,
  haystack: Iterable<NodeWithDistance<Searchable>>,
) {
  for (const { node: candidate } of haystack) {
    if (candidate === needle) {
      throw new Error();
    }
  }
}

function BT(value: number) {
  return new BinaryTree(value);
}
