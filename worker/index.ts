// Entry point. wrangler.jsonc routes only page paths here, and public/_headers sets
// `Vary: Accept` on both variants; the negotiation itself lives in ./negotiate.
import { negotiate } from "./negotiate";

export default {
  fetch: (request, env) => negotiate(request, env.ASSETS),
} satisfies ExportedHandler<Env>;
