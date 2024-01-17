import {
  // BidirectionalSearchSolution,
  BruteForceSolution,
  Solution,
} from "./4_1";
import { GraphNode } from "../models/graph";

const solutions: Solution[] = [
  new BruteForceSolution(),
  // new BidirectionalSearchSolution(),
];

describe.each(solutions)("solution", (solution) => {
  const name = solution.constructor.name;

  test(`${name}: with the target and the origin being the same`, () => {
    const origin = new GraphNode();
    const actual = solution.existsPath(origin, origin);
    expect(actual).toBe(true);
  });

  // A   B
  test(`${name}: with a node not connected to the target`, () => {
    const origin = new GraphNode();
    const target = new GraphNode();

    const actual = solution.existsPath(origin, target);

    expect(actual).toBe(false);
  });

  // A --> B
  test(`${name}: with a node directly connected to the target`, () => {
    const origin = new GraphNode();
    const target = new GraphNode();
    origin.link(target);

    const actual = solution.existsPath(origin, target);

    expect(actual).toBe(true);
  });

  // A <-- B
  test(`${name}: with a node connected to the target in the other direction`, () => {
    const origin = new GraphNode();
    const target = new GraphNode();
    target.link(origin);

    const actual = solution.existsPath(origin, target);

    expect(actual).toBe(false);
  });

  // A --> B --> C
  test(`${name}: with a node connected to the target through an intermediary`, () => {
    const origin = new GraphNode();
    const intermediary = new GraphNode();
    const target = new GraphNode();
    origin.link(intermediary);
    intermediary.link(target);

    const actual = solution.existsPath(origin, target);

    expect(actual).toBe(true);
  });

  // A <--> B --> C
  test(`${name}: with a target and a cycle on the root node`, () => {
    const origin = new GraphNode();
    const second = new GraphNode();
    const target = new GraphNode();
    origin.link(second);
    second.link(origin);
    second.link(target);

    const actual = solution.existsPath(origin, target);

    expect(actual).toBe(true);
  });

  // A --> B <--> C
  test(`${name}: with a target and a cycle outside the root node`, () => {
    const origin = new GraphNode();
    const second = new GraphNode();
    const third = new GraphNode();
    const target = new GraphNode();
    origin.link(second);
    second.link(third);
    third.link(second);
    third.link(target);

    const actual = solution.existsPath(origin, target);

    expect(actual).toBe(true);
  });
});
