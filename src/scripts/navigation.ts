// Client-router glue: which link morphs, how the morph runs, prefetching, and when heavy page setup may start.

const path = (location: URL | HTMLAnchorElement) => location.pathname.replace(/\/$/, "");

// The index links one entry from several places, so names go only to the link used, and back to it on return.
let used: { path: string; scope: string | undefined } | undefined;
let leaving = "";

function nameOnly(link: HTMLAnchorElement | undefined) {
  for (const el of document.querySelectorAll<HTMLElement>("[data-morph]")) {
    el.style.viewTransitionName = link?.contains(el) ? (el.dataset.morph ?? "") : "";
  }
}

document.addEventListener("astro:before-preparation", (event) => {
  leaving = path(event.from);
  const link = event.sourceElement?.closest("a[data-morph-scope]");
  if (!(link instanceof HTMLAnchorElement)) return;
  used = { path: path(link), scope: link.dataset.morphScope };
  nameOnly(link);
});

document.addEventListener("astro:after-swap", () => {
  // Icons load lazily on a full load; after a swap they are cached, and lazy loading would paint them frames late.
  for (const img of document.querySelectorAll<HTMLImageElement>(".squircle img")) {
    img.loading = "eager";
    img.decoding = "sync";
  }
  const links = [...document.querySelectorAll<HTMLAnchorElement>("a[data-morph-scope]")].filter(
    (link) => path(link) === leaving,
  );
  if (links.length === 0) return;
  nameOnly(links.find((link) => used?.path === leaving && link.dataset.morphScope === used.scope) ?? links.at(-1));
});

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
  if (saveData()) return;
  for (const link of document.querySelectorAll<HTMLAnchorElement>("a[href^='/']")) {
    if (link.pathname !== location.pathname) visible.observe(link);
  }
});

let finished: Promise<unknown> = Promise.resolve();

document.addEventListener("astro:before-swap", (event) => {
  finished = event.viewTransition.finished.catch(() => {});
  composite(event.viewTransition);
});

/** Resolves when the current page's view transition has finished, at once after a full load. */
export const transitionEnd = () => finished;
