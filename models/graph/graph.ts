import { Searchable } from "./search";

export class UniqueValuesGraph<TValue> {
  readonly valueToNode = new Map<TValue, GraphNode<TValue>>();

  get nodes() {
    return this.valueToNode.values();
  }

  ensureNodeExists(value: TValue) {
    return;
  }

  addEdge(origin: TValue, destination: TValue) {
    return;
  }
}

export class GraphNode<TValue = undefined, TMetaData = undefined>
  implements Searchable
{
  readonly adjacent = new Set<this>();
  metadata?: TMetaData;

  constructor(public value?: TValue) {}

  link(target: this) {
    this.adjacent.add(target);
  }
}
