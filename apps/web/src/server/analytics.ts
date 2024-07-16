"use server"

import { env } from "@/env"
import { PostHog } from "posthog-node"

function serverSideAnalytics() {
  const posthogClient = new PostHog(env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  })
  return posthogClient
}

const analyticsServerClient = serverSideAnalytics()

export default analyticsServerClient
