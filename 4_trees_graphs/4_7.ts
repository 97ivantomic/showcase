export type ProjectName = string;
export type ProjectBuildOrder = ProjectName[];
export type DependencyContract = {
  client: ProjectName;
  dependency: ProjectName;
};

export interface Solution {
  /**
   * @returns `null` if no valid order to build all projects exists.
   */
  findProjectBuildOrder(graph: DependencyGraph): ProjectBuildOrder | null;
}

/**
 * @todo Mark dependencies as satisfied instead of removing clients
 * for the sake of readabilty.
 */
export class BruteForceSolution implements Solution {
  findProjectBuildOrder(graph: DependencyGraph) {
    if (graph.size <= 1) {
      return graph.projects.map((project) => project.name);
    }

    let buildableProjects = graph.findAllWithoutDependencies();
    const buildOrder: Project[] = [];
    while (buildableProjects.length) {
      const buildableProject = buildableProjects[0];

      buildOrder.push(buildableProject);
      buildableProject.removeAllClients();

      buildableProjects = graph.findAllWithoutDependencies(new Set(buildOrder));
    }

    const haveAllBeenBuilt = buildOrder.length === graph.size;
    if (!haveAllBeenBuilt) {
      return null;
    }

    return buildOrder.map((p) => p.name);
  }
}

export class ProjectNotFound extends Error {
  constructor(message = "") {
    super(message);
    this.name = "ProjectNotFound";
  }
}

export class DependencyGraph {
  private nameToProject: Map<string, Project> = new Map();

  get projects() {
    return [...this.nameToProject.values()];
  }

  get size() {
    return [...this.projects].length;
  }

  addProject(name: ProjectName): Project {
    const node = new Project(name);
    this.nameToProject.set(name, node);
    return node;
  }

  getProject(name: ProjectName): Project | null {
    return this.nameToProject.get(name) ?? null;
  }

  addDependency({ client, dependency }: DependencyContract): this {
    const clientProject = this.getProject(client);
    const dependencyProject = this.getProject(dependency);
    if (!clientProject || !dependencyProject) {
      throw new ProjectNotFound();
    }
    clientProject.addDependency(dependencyProject);
    return this;
  }

  findAllWithoutDependencies(excluded: Set<Project> = new Set()): Project[] {
    return this.projects
      .filter((p) => !excluded.has(p))
      .filter((p) => p.dependencies.size === 0);
  }
}

export class Project {
  readonly dependencies: Set<this> = new Set();
  readonly clients: Set<this> = new Set();

  constructor(public name: ProjectName) {}

  addDependency(dependency: this) {
    dependency.clients.add(this);
    this.dependencies.add(dependency);
  }

  removeDependency(dependency: this) {
    dependency.clients.delete(this);
    this.dependencies.delete(dependency);
  }

  addClient(client: this) {
    client.dependencies.add(this);
    this.clients.add(client);
  }

  removeAllClients() {
    this.clients.forEach((client) => {
      client.removeDependency(this);
    });
    this.clients.clear();
  }
}

export class DepthFirstSearchSolution implements Solution {
  findProjectBuildOrder(graph: DependencyGraph): ProjectBuildOrder | null {
    return null;
  }
}

export const solutions = [
  new BruteForceSolution(),
  // new DepthFirstSearchSolution(),
];
