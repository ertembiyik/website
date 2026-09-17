// Dev-only: mounts the Agentation feedback toolbar in copy-prompt mode (annotate the page, copy
// the markdown, paste it to the agent). Loaded via an inline module script in Layout.astro that
// is only rendered when import.meta.env.DEV, so React never enters the production bundle.
//
// Agentation documents one setup: <Agentation /> in a Next.js root layout, which stays mounted
// across client navigations. Astro's <ClientRouter /> swaps <head> and <body> instead, so this
// file does the equivalent with the router's own hooks: carry Agentation's stylesheets (appended
// to <head> when the module is evaluated) into the next document, and mount once per page.
import { Agentation } from "agentation";
import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";

const styles = Array.from(document.head.querySelectorAll("style")).filter((style) =>
  /^(feedback-tool-styles-|feedback-cursor-styles|agentation-)/.test(style.id),
);

let root: Root | undefined;

function mount() {
  root?.unmount();
  const host = document.createElement("div");
  host.id = "agentation";
  document.body.append(host);
  root = createRoot(host);
  root.render(createElement(Agentation));
}

mount();
document.addEventListener("astro:before-swap", (event) => {
  for (const style of styles) event.newDocument.head.append(style.cloneNode(true));
});
document.addEventListener("astro:after-swap", mount);
