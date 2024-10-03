// import {serial,pgTable,time,varchar,boolean,timestamp,text,integer,PgEnum, pgEnum}from "drizzle-orm/pg-core";
// export const userType=pgEnum("user_type",[
//     "admin",
//     "customers"
// ]);

// export const users=pgTable("users",{
//     id:serial("id").primaryKey(),
//     email:varchar("email",{length:50}).notNull(),
//     password:text("password").notNull(),
//     firstName:varchar("firstName").notNull(),
//     lastName:varchar("lastName").notNull(),
//     admin:boolean("admin").notNull().default(false),
//     createdAt:timestamp("createdAt").notNull().defaultNow(),
//     updatedAt:timestamp("updatedAt").notNull().defaultNow()
// });