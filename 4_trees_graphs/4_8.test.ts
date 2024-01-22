import { BinaryTree } from "../models/graph";

import { solutions } from "./4_8";

describe.each(solutions)("findFirstCommonAncestor", (solution) => {
  test("with nodes being the same", () => {
    const node = BT();
    const actual = solution.findFirstCommonAncestor(node, node);
    expect(actual).toBe(null);
  });

  test("");

  test.skip("with nodes not having a common ancestor", () => {
    const first = BT();
    const second = BT();
  });
});

function BT() {
  return new BinaryTree(undefined);
}
