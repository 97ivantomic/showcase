import { Searchable, visitBreadthFirst } from "./search";

export interface Printable {
  readonly value?: number | string;
}

export function printTree(origin: Printable & Searchable) {
  const result = [];
  for (const { node } of visitBreadthFirst(origin)) {
    result.push(String(node.value));
  }
  return result.join(" ");
}
