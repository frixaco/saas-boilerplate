"use server"

import { db } from "./db"
import { auth, clerkClient } from "@clerk/nextjs/server"
import { ratelimit } from "./ratelimit"
import postHogServerClient from "./analytics"

export async function sayHelloWorld({ input }: any) {
  // sleep for .5 seconds
  await new Promise((resolve) => setTimeout(resolve, 500))
  // update the message
  return {
    result: input.message || "N/A",
  }
}

export async function getCurrentUser() {
  const authorizedUser = auth()
  if (!authorizedUser.userId) throw new Error("Unauthorized")

  const posthog = postHogServerClient()
  posthog.capture({
    distinctId: authorizedUser.userId,
    event: "get current user",
    properties: {
      metadata: "metadata",
    },
  })
  await posthog.shutdown()

  const { success } = await ratelimit.limit(authorizedUser.userId)

  if (!success) {
    throw new Error("Rate limit reached")
  }

  // TODO:
  // 1. Register new user
  // 2. Add private metada to the user (e.g. allow something)
  const fullUserData = await clerkClient.users.getUser(authorizedUser.userId)
  if (fullUserData.privateMetadata?.["can-do-something"] !== true) {
    throw new Error("User can't do something")
  }

  const user = await db.query.user.findFirst({
    where: ({ uuid }, { eq }) => eq(uuid, authorizedUser.userId),
  })

  return user
}
