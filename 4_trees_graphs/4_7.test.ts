import { DependencyGraph, Project, ProjectNotFound, solutions } from "./4_7";

describe.each(solutions)("findProjectBuildOrder", (solution) => {
  const name = solution.constructor.name;

  test(`${name}: with no projects`, () => {
    const graph = new DependencyGraph();
    const order = solution.findProjectBuildOrder(graph);
    expect(order).toEqual([]);
  });

  test(`${name}: with a single project`, () => {
    const graph = new DependencyGraphBuilder().withProject("A").build();
    const order = solution.findProjectBuildOrder(graph);
    expect(order).toEqual(["A"]);
  });

  test(`${name}: with two projects and a circular dependency`, () => {
    const graph = new DependencyGraphBuilder()
      .withProject("A")
      .withProject("B")
      .build()
      .addDependency({ client: "A", dependency: "B" })
      .addDependency({ client: "B", dependency: "A" });
    const order = solution.findProjectBuildOrder(graph);
    expect(order).toBe(null);
  });

  test(`${name}: with two projects and buildable`, () => {
    const graph = new DependencyGraphBuilder()
      .withProject("A")
      .withProject("B")
      .build()
      .addDependency({ client: "A", dependency: "B" });
    const order = solution.findProjectBuildOrder(graph);
    expect(order).toEqual(["B", "A"]);
  });

  test(`${name}: partially buildable`, () => {
    const graph = new DependencyGraphBuilder()
      .withProject("A")
      .withProject("B")
      .withProject("C")
      .build()
      .addDependency({ client: "A", dependency: "B" })
      .addDependency({ client: "B", dependency: "A" });
    const order = solution.findProjectBuildOrder(graph);
    expect(order).toEqual(null);
  });
});

describe("Project", () => {
  describe("addDependency", () => {
    it("adds the dependency by updating both objects", () => {
      const dependency = new Project("dependency");
      const client = new Project("client");

      client.addDependency(dependency);

      expect(dependency.clients).toContain(client);
      expect(client.dependencies).toContain(dependency);
    });
  });

  describe("removeDependency", () => {
    it("removes the dependency by updating both objects", () => {
      const dependency = new Project("dependency");
      const client = new Project("client");
      client.addDependency(dependency);

      client.removeDependency(dependency);

      expect(dependency.clients).not.toContain(client);
      expect(client.dependencies).not.toContain(dependency);
    });
  });

  describe("addClient", () => {
    it("adds the client by updating both objects", () => {
      const dependency = new Project("dependency");
      const client = new Project("client");

      dependency.addClient(client);

      expect(dependency.clients).toContain(client);
      expect(client.dependencies).toContain(dependency);
    });
  });

  describe("removeAllClients", () => {
    it("removes all clients by updating all objects", () => {
      const dependency = new Project("dependency");
      const clientA = new Project("client");
      const clientB = new Project("client");
      dependency.addClient(clientA);
      dependency.addClient(clientB);

      dependency.removeAllClients();

      expect(dependency.clients).not.toContain(clientA);
      expect(dependency.clients).not.toContain(clientB);
      expect(clientA.dependencies).not.toContain(dependency);
      expect(clientB.dependencies).not.toContain(dependency);
    });
  });
});

describe("DependencyGraph", () => {
  describe("projects", () => {
    test("with multiple projects", () => {
      const graph = new DependencyGraph();
      const projectA = graph.addProject("A");
      const projectB = graph.addProject("B");

      expect(graph.projects).toEqual([projectA, projectB]);
    });
  });

  describe("size", () => {
    test("with multiple projects", () => {
      const graph = new DependencyGraph();
      graph.addProject("A");
      graph.addProject("B");

      expect(graph.size).toBe(2);
    });
  });

  describe("addProject", () => {
    it("can create a project", () => {
      const graph = new DependencyGraph();
      const project = graph.addProject("A");
      expect(graph.projects).toContain(project);
    });

    it("can override an existing project", () => {
      const graph = new DependencyGraph();
      const old = graph.addProject("A");

      const actual = graph.addProject("A");

      expect(actual).not.toBe(old);
    });
  });

  describe("getProject", () => {
    test("when the project exists", () => {
      const graph = new DependencyGraph();
      graph.addProject("A");

      const project = graph.getProject("A");

      expect(project).toBeInstanceOf(Project);
    });

    test("when the project doesn't exist", () => {
      const graph = new DependencyGraph();
      const project = graph.getProject("A");
      expect(project).toBe(null);
    });
  });

  describe("addDependency", () => {
    // example of a mockist test (behaviour verification)
    // source: https://martinfowler.com/articles/mocksArentStubs.html
    it("(mockist) creates the client-dependency relationship when both projects exist", () => {
      const graph = new DependencyGraph();
      const client = graph.addProject("C");
      const dependency = graph.addProject("D");
      const mock = jest.spyOn(client, "addDependency");

      graph.addDependency({ client: "C", dependency: "D" });

      expect(mock).toHaveBeenCalledWith(dependency);
    });

    // example of a classicist test (state verification)
    // source: https://martinfowler.com/articles/mocksArentStubs.html
    it("(classicist) creates the client-dependency relationship when both projects exist", () => {
      const graph = new DependencyGraph();
      const client = graph.addProject("C");
      const dependency = graph.addProject("D");

      graph.addDependency({ client: "C", dependency: "D" });

      expect(client.dependencies).toContain(dependency);
      expect(dependency.clients).toContain(client);
    });

    it("throws when the client doesn't exist", () => {
      const graph = new DependencyGraph();
      graph.addProject("D");

      expect(() => {
        graph.addDependency({ client: "C", dependency: "D" });
      }).toThrow(ProjectNotFound);
    });

    it("throws when the dependency doesn't exist", () => {
      const graph = new DependencyGraph();
      graph.addProject("C");

      expect(() => {
        graph.addDependency({ client: "C", dependency: "D" });
      }).toThrow(ProjectNotFound);
    });
  });

  describe("findAllWithoutDependencies", () => {
    test("when all projects have dependencies", () => {
      const graph = new DependencyGraph();
      graph.addProject("A");
      graph.addProject("B");
      graph.addDependency({ client: "A", dependency: "B" });
      graph.addDependency({ client: "B", dependency: "A" });

      expect(graph.findAllWithoutDependencies()).toEqual([]);
    });

    test("when some projects don't have dependencies", () => {
      const graph = new DependencyGraph();
      const projectA = graph.addProject("A");
      const projectB = graph.addProject("B");
      graph.addDependency({ client: "A", dependency: "B" });

      expect(graph.findAllWithoutDependencies()).toEqual([projectB]);
    });

    test("when a project doesn't have dependencies, but it's been excluded", () => {
      const graph = new DependencyGraph();
      const projectA = graph.addProject("A");
      const projectB = graph.addProject("B");
      graph.addDependency({ client: "A", dependency: "B" });

      const excluded = new Set([projectB]);
      const actual = graph.findAllWithoutDependencies(excluded);

      expect(actual).toEqual([]);
    });
  });
});

class DependencyGraphBuilder {
  private graph = new DependencyGraph();

  withProject(name: string) {
    this.graph.addProject(name);
    return this;
  }

  build() {
    return this.graph;
  }
}
