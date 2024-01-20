import { Searchable } from "./search";

export class BinaryTree<TValue = undefined> implements Searchable {
  protected _left?: this;
  protected _right?: this;

  constructor(public value: TValue) {}

  get left() {
    return this._left;
  }

  set left(tree: this | undefined) {
    this._left = tree;
  }

  get right() {
    return this._right;
  }

  set right(tree: this | undefined) {
    this._right = tree;
  }

  get adjacent() {
    const set = new Set<this>();
    [this.left, this.right].filter(Boolean).forEach((node) => {
      set.add(node as this);
    });
    return set;
  }

  withLeft(tree: this) {
    this.left = tree;
    return this;
  }

  withRight(tree: this) {
    this.right = tree;
    return this;
  }
}

export class InvalidBranchValue extends Error {
  constructor(message = "") {
    super(message);
    this.name = "InvalidBranchValue";
  }
}

export class BinarySearchTree<TValue = undefined> extends BinaryTree<TValue> {
  private _parent?: this;

  get parent() {
    return this._parent;
  }

  set parent(parent: this | undefined) {
    this._parent = parent;
  }

  get left() {
    return this._left;
  }

  set left(tree: this | undefined) {
    if (!this.wouldBeValidLeftBranch(tree)) {
      throw new InvalidBranchValue();
    }
    if (tree !== undefined) {
      tree.parent = this;
    }
    this._left = tree;
  }

  get right() {
    return this._right;
  }

  set right(tree: this | undefined) {
    if (!this.wouldBeValidRightBranch(tree)) {
      throw new InvalidBranchValue();
    }
    if (tree !== undefined) {
      tree.parent = this;
    }
    this._right = tree;
  }

  private wouldBeValidLeftBranch(candidate: this | undefined) {
    return !candidate || candidate.value < this.value;
  }

  private wouldBeValidRightBranch(candidate: this | undefined) {
    return !candidate || candidate.value >= this.value;
  }
}
