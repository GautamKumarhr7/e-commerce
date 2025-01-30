import { create } from "domain";
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
  unique
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

export const addToCart=pgTable("add_to_cart",{
  id:serial("id").primaryKey(),
  userId:integer("userId").notNull(),
  productId:integer("productId").notNull(),
  quantity:integer("quantity").notNull(),
  totalPrice:integer("totalPrice").notNull(),
  createdAt:timestamp("createdAt").notNull().defaultNow(),

},(table)=>({tableUniqueId:unique().on(table.userId,table.productId)}));

export const Order=pgTable("order",{
  id:serial("id").primaryKey(),
  userId:integer("userId").notNull(),
  addressId:integer("addressId").notNull(),
  totalAmount:integer("totalAmount").notNull(),
  status:varchar("status").notNull().default("pending"),
  paymentId:varchar("paymentId").notNull(),
  cancelReasion:text("cancelReasion"),
  createdAt:timestamp("createdAt").notNull().defaultNow(),
},(table)=>({tableUniqueId:unique().on(table.userId,table.addressId,table.paymentId)}));

export const OrderItems=pgTable("order_items",{
  id:serial("id").primaryKey(),
  orderId:integer("orderId").notNull(),
  productId:integer("productId").notNull(),
  quantity:integer("quantity").notNull(),
  price:integer("price").notNull(),
  createdAt:timestamp("createdAt").notNull().defaultNow(),
});

export const deliveryAddress=pgTable("delivery_address",{
  id:serial("id").primaryKey(),
  userId:integer("userId").notNull(),
  name:varchar("name").notNull(),
  address:varchar("address").notNull(),
  city:varchar("city").notNull(),
  state:varchar("state").notNull(),
  postalCode:integer("postalCode").notNull(),
  country:varchar("country").notNull(),
  phoneNumber:integer("phoneNumber").notNull(),
  active:boolean("isDefault").notNull().default(false),
  createdAt:timestamp("createdAt").notNull().defaultNow(),
});

export const payment=pgTable("payment",{
  id:serial("id").primaryKey(),
  orderId:integer("orderId").notNull(),
  RazorPaymentId:varchar("razorPaymentId").notNull(),
  signature:varchar("signature").notNull(),
  status:varchar("status").notNull(),
  createdAt:timestamp("createdAt").notNull().defaultNow(),
},(table)=>({tableUniqueId:unique().on(table.orderId,table.RazorPaymentId)}));


