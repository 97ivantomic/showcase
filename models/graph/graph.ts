import { Searchable } from "./search";

export class GraphNode<TValue = undefined> implements Searchable {
  readonly adjacent = new Set<this>();

  constructor(public value?: TValue) {}

  link(target: this) {
    this.adjacent.add(target);
  }
}
