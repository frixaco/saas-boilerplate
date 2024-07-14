import * as Sentry from "@sentry/nextjs";

export function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // this is your Sentry.init call from `sentry.server.config.js|ts`
    Sentry.init({
      dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
      // Your Node.js Sentry configuration...
    });
  }

  // This is your Sentry.init call from `sentry.edge.config.js|ts`
  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn: "https://examplePublicKey@o0.ingest.sentry.io/0",
      // Your Edge Runtime Sentry configuration...
    });
  }
}
