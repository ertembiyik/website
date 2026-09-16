// Dev-only: mounts the Agentation feedback toolbar. Loaded via an inline import() in Layout.astro
// that is only rendered when import.meta.env.DEV, so React never enters the production bundle.
import { Agentation, type AgentationProps } from "agentation";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

const host = document.createElement("div");
host.id = "agentation";
document.body.append(host);

// Annotations sync to `agentation-mcp server` (see .mcp.json) when it is running.
const props: AgentationProps = { endpoint: "http://localhost:4747" };
createRoot(host).render(createElement<AgentationProps>(Agentation, props));
