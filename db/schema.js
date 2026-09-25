import {
  pgTable,
  serial,
  text,
  numeric,
  timestamp,
  varchar,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

// Define categories first since products references it
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  SKU: varchar("sku", { length: 100 }).unique().notNull(),
  // Use integer and add the explicit foreign key reference
  categoryId: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  // Standard integer is better for stock counts
  stockQuantity: integer("stock_quantity").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric("compare_at_price", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  altText: varchar("alt_text", { length: 255 }).notNull(),
  // Use integer and add the explicit foreign key reference
  productId: integer("product_id")
    .references(() => products.id, { onDelete: "cascade" })
    .notNull(),
  imageUrl: text("image_url").notNull(),
  // Standard integer for sorting
  sortOrder: integer("sort_order").notNull(),
  isPrimary: boolean("is_primary").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
