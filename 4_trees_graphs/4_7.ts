import { GraphNode } from "../models/graph";

export interface Solution {
  getBuildOrder(graph: GraphNode): string;
}
