import { pgTable, serial, varchar, text, timestamp, PgEnum, pgEnum } from "drizzle-orm/pg-core";

// Define the roles as an enum type
const rolesEnum = pgEnum("roles", ["admin", "viewer", "editor"]); // Enum values for user roles

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).notNull(),
    password: text("password").notNull(),
    name: varchar("name").notNull(),
    role: rolesEnum("role").default("viewer"), // Default role is 'viewer'
    createdAt: timestamp("createdAt").notNull().defaultNow(), // Auto-timestamp
});

