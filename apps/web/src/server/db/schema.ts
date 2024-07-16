import { serial, text, timestamp, pgTableCreator } from "drizzle-orm/pg-core"

// TODO: update default prefix for tables if needed
const pgTable = pgTableCreator((name) => `my_${name}`)

export const user = pgTable("user", {
  id: serial("id"),
  uuid: text("uuid").unique().notNull(),
  name: text("name"),
  email: text("email"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
})
