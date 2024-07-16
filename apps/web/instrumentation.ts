import { env } from "@/env"
import * as Sentry from "@sentry/nextjs"

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // this is your Sentry.init call from `sentry.server.config.js|ts`
    Sentry.init({
      dsn: env.SENTRY_DSN,
      tracesSampleRate: 1,
      debug: false,
      // Your Node.js Sentry configuration...
    })
  }

  // This is your Sentry.init call from `sentry.edge.config.js|ts`
  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: env.SENTRY_DSN,
      tracesSampleRate: 1,
      debug: false,
    })
  }
}
