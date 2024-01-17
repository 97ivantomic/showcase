import { GraphNode } from "./graph";

describe("GraphNode", () => {
  describe("link", () => {
    it("adds the target to the adjacent nodes", () => {
      const origin = new GraphNode();
      const target = new GraphNode();

      origin.link(target);

      expect(origin.adjacent).toContain(target);
    });
  });
});
