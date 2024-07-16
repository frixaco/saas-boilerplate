"use server"

import { db } from "./db"
import { auth, clerkClient } from "@clerk/nextjs/server"
import analyticsServerClient from "./analytics"
import { ratelimit } from "./ratelimit"

export async function getCurrentUser() {
  const authorizedUser = auth()
  if (!authorizedUser.userId) throw new Error("Unauthorized")

  analyticsServerClient.capture({
    distinctId: authorizedUser.userId,
    event: "get current user",
    properties: {
      metadata: "metadata",
    },
  })

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
