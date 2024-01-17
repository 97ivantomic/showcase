import { printTree } from "./print";
import { BinaryTree } from "./tree";

describe("print", () => {
  test("with no value", () => {
    const tree = new BinaryTree(undefined);
    expect(printTree(tree)).toBe("undefined");
  });

  test("with a value and no descendents", () => {
    const tree = new BinaryTree(1);
    expect(printTree(tree)).toBe("1");
  });

  test("with a value and both descendents", () => {
    const tree = BT(1).withLeft(BT(2)).withRight(BT(3));
    expect(printTree(tree)).toBe("1 2 3");
  });

  test("with three levels", () => {
    const tree = BT(1)
      .withLeft(BT(2).withLeft(BT(4)).withRight(BT(5)))
      .withRight(BT(3).withLeft(BT(6)).withRight(BT(7)));
    expect(printTree(tree)).toBe("1 2 3 4 5 6 7");
  });
});

function BT(value: number) {
  return new BinaryTree(value);
}
