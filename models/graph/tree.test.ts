import { BinaryTree } from "./tree";

describe("BinaryTree", () => {
  describe("adjacent", () => {
    test("without left or right descendent", () => {
      const node = new BinaryTree(undefined);
      expect(node.adjacent).toEqual(new Set());
    });

    test("with both descendents", () => {
      const left = new BinaryTree(2);
      const right = new BinaryTree(3);

      const node = new BinaryTree(1).withLeft(left).withRight(right);

      expect(node.adjacent).toContain(left);
      expect(node.adjacent).toContain(right);
    });
  });
});
