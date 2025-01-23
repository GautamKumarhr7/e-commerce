import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  pgEnum,
  integer,
  bigint,
  boolean,
  json,
} from "drizzle-orm/pg-core";

// Define the roles as an enum type
const rolesEnum = pgEnum("roles", ["admin", "viewer", "editor"]); // Enum values for user roles

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password: text("password").notNull(),
  name: varchar("name").notNull(),
  role: rolesEnum("role").default("viewer"), // Default role is 'viewer'
  createdAt: timestamp("createdAt").notNull().defaultNow(), // Auto-timestamp
});

export const Products=pgTable("products",{
  id:serial("id").primaryKey(),
  name:varchar("name").notNull(),
  price:integer("price").notNull(),
  discription:text("discription").notNull(),
  stock:integer("stock").notNull(),
  discount:integer("discount").notNull(),
  categoryId:bigint("categoryId", {
    mode: "number"
  }).notNull(),
  image:json("image"),
  status:boolean("status").notNull().default(true),
  createdAt:timestamp("createdAt").notNull().defaultNow(),
  updateAt:timestamp("updateAt").notNull().defaultNow(),

  
});

export const Category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  parent_id: integer("parent_id"),
  description: text("description"),
  image_url: varchar("image_url", { length: 255 }),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
