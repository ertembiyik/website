// Client-router glue: which link morphs, how the morph runs, prefetching, and when heavy page setup may start.

const path = (location: URL | HTMLAnchorElement) => location.pathname.replace(/\/$/, "");

// The index links one entry from several places, so names go to exactly one link per navigation: the one used,
// else the one last used for that page, else its row. A navigation from anything else clears them.
let used: { path: string; scope: string | undefined } | undefined;
let leaving = "";

function linkTo(to: string) {
  const links = [...document.body.querySelectorAll<HTMLAnchorElement>("a[data-morph-scope]")].filter((link) => path(link) === to);
  return links.find((link) => used?.path === to && link.dataset.morphScope === used.scope) ?? links.at(-1);
}

function nameOnly(link: HTMLAnchorElement | undefined) {
  for (const el of document.body.querySelectorAll<HTMLElement>("[data-morph]")) {
    el.style.viewTransitionName = link?.contains(el) ? (el.dataset.morph ?? "") : "";
  }
}

document.addEventListener("astro:before-preparation", (event) => {
  leaving = path(event.from);
  const clicked = event.sourceElement?.closest("a[data-morph-scope]");
  const link = clicked instanceof HTMLAnchorElement ? clicked : linkTo(path(event.to));
  if (link) used = { path: path(link), scope: link.dataset.morphScope };
  nameOnly(link);
});

// iPhone Safari paints the page under its status bar and toolbar, beyond what a page snapshot covers, so there the
// root takes no snapshot (globals.css) and the live pages cross-fade: the one being left stays on screen above the
// new one and fades out as the new one fades in (`.page-leaving` and `.page-arriving` in globals.css).
const liveFade = CSS.supports("-webkit-touch-callout", "none");
let leavingPage: { element: HTMLElement; scroll: number } | undefined;

function keepLeavingPage() {
  const element = document.createElement("div");
  element.className = "page-leaving";
  element.inert = true;
  // Its icon and title travel as snapshots; the copies left behind would show twice and clash by name.
  for (const el of document.body.querySelectorAll<HTMLElement>("[data-morph], .morph, .squircle")) {
    if (!el.style.viewTransitionName) continue;
    el.style.viewTransitionName = "";
    el.style.visibility = "hidden";
  }
  element.append(...document.body.childNodes);
  document.documentElement.append(element);
  leavingPage = { element, scroll: scrollY };
}

function crossFade({ element, scroll }: NonNullable<typeof leavingPage>) {
  // Stays where it was on screen while the router scrolls the new page into place.
  element.style.top = `${scrollY - scroll}px`;
  element.addEventListener("animationend", () => element.remove(), { once: true });
  element.classList.add("is-fading");
  const { body } = document;
  body.classList.add("page-arriving");
  body.addEventListener("animationend", function settle(event) {
    if (event.target !== body) return;
    body.classList.remove("page-arriving");
    body.removeEventListener("animationend", settle);
  });
}

document.addEventListener("astro:after-swap", () => {
  if (leavingPage) crossFade(leavingPage);
  leavingPage = undefined;
  // Icons load lazily on a full load; after a swap they are cached, and lazy loading would paint them frames late.
  for (const img of document.body.querySelectorAll<HTMLImageElement>(".squircle img")) {
    img.loading = "eager";
    img.decoding = "sync";
  }
  nameOnly(linkTo(leaving));
});

// A detail page's back link goes back in history, keeping the index's scroll, when the reader came from within
// the site; a direct visitor just goes home. The router keeps its own position as history.state.index.
document.addEventListener(
  "click",
  (event) => {
    const back = event.target instanceof Element ? event.target.closest("a[data-back]") : null;
    if (!back || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const index: unknown = history.state?.index;
    if (typeof index !== "number" || index === 0) return;
    event.preventDefault();
    history.back();
  },
  { capture: true },
);

// Browsers morph a group's width and height on the main thread (60 fps cap on iPhone); a scale draws the same frames on the compositor.
const fromTopLeft = (transform: string, width: number, height: number) =>
  new DOMMatrix()
    .translate(width / 2, height / 2)
    .multiply(new DOMMatrix(transform === "none" ? undefined : transform))
    .translate(-width / 2, -height / 2);

function composite(transition: ViewTransition) {
  transition.ready.then(
    () => {
      const root = document.documentElement;
      for (const animation of document.getAnimations()) {
        const effect = animation.effect;
        if (!(effect instanceof KeyframeEffect)) continue;
        const { pseudoElement } = effect;
        if (!pseudoElement?.startsWith("::view-transition-group(")) continue;
        const [from] = effect.getKeyframes();
        if (typeof from?.width !== "string" || typeof from.height !== "string") continue;
        // WebKit leaves out a transform that is the identity.
        const fromTransform = typeof from.transform === "string" ? from.transform : "none";
        const { duration, delay } = effect.getTiming();
        animation.cancel();

        const to = getComputedStyle(root, pseudoElement);
        const fromWidth = parseFloat(from.width);
        const toWidth = parseFloat(to.width);
        if (!toWidth) continue;
        const start = fromTopLeft(fromTransform, fromWidth, parseFloat(from.height)).scale(fromWidth / toWidth);
        const end = fromTopLeft(to.transform, toWidth, parseFloat(to.height));
        if (start.toString() === end.toString()) continue;
        const scale = root.animate(
          [
            { transformOrigin: "0 0", transform: start.toString() },
            { transformOrigin: "0 0", transform: end.toString() },
          ],
          { pseudoElement, duration, delay, easing: from.easing, fill: "both" },
        );
        // A filling animation outlives its transition and would land on the next group of this name.
        transition.finished.finally(() => scale.cancel());
      }
    },
    () => {},
  );
}

// Same request as the router's fetch(): <link rel="prefetch"> sends a navigation Accept, which `Vary: Accept` keeps apart.
const prefetched = new Set<string>();
const visible = new IntersectionObserver((entries) => {
  for (const { isIntersecting, target } of entries) {
    if (!isIntersecting || !(target instanceof HTMLAnchorElement)) continue;
    visible.unobserve(target);
    const { pathname } = target;
    if (prefetched.has(pathname)) continue;
    prefetched.add(pathname);
    // Read to the end, so the response is cached whole.
    fetch(pathname, { priority: "low" })
      .then((response) => response.blob())
      .catch(() => prefetched.delete(pathname));
  }
});

const saveData = () =>
  "connection" in navigator &&
  typeof navigator.connection === "object" &&
  navigator.connection !== null &&
  "saveData" in navigator.connection &&
  navigator.connection.saveData === true;

document.addEventListener("astro:page-load", () => {
  visible.disconnect();
  if (saveData() || !navigator.onLine) return;
  for (const link of document.body.querySelectorAll<HTMLAnchorElement>("a[href^='/']")) {
    if (link.pathname !== location.pathname) visible.observe(link);
  }
});

let finished: Promise<unknown> = Promise.resolve();

document.addEventListener("astro:before-swap", (event) => {
  finished = event.viewTransition.finished.catch(() => {});
  composite(event.viewTransition);
  if (liveFade) keepLeavingPage();
});

/** Resolves when the current page's view transition has finished, at once after a full load. */
export const transitionEnd = () => finished;
