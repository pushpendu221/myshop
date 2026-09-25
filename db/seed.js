import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { categories, products, productImages } from "./schema.js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

async function seed() {
  console.log("Seeding categories...");

  // 1. Insert Categories and grab their generated IDs
  const insertedCategories = await db
    .insert(categories)
    .values([
      {
        name: "Smart Home Devices",
        slug: "smart-home-devices",
        description: "Automate your life with smart lighting, fans, and more.",
        imageUrl:
          "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&q=80",
        isActive: true,
      },
      {
        name: "Indoor Plants",
        slug: "indoor-plants",
        description:
          "Bring nature inside with fragrant and low-maintenance plants perfect for balconies.",
        imageUrl:
          "https://images.unsplash.com/photo-1477554193778-9562c28588c0?w=500&q=80",
        isActive: true,
      },
    ])
    .returning({ id: categories.id });

  const smartHomeId = insertedCategories[0].id;
  const plantsId = insertedCategories[1].id;

  console.log("Seeding products...");

  // 2. Insert Products using the Category IDs
  const insertedProducts = await db
    .insert(products)
    .values([
      {
        name: "Philips WiZ Smart Wi-Fi LED Bulb",
        slug: "philips-wiz-smart-led-bulb",
        SKU: "PH-WIZ-101",
        categoryId: smartHomeId,
        stockQuantity: 150,
        description:
          "16 Million colors with app and voice control. Perfect for setting the mood.",
        price: "12.99",
        compareAtPrice: "15.99",
        isActive: true,
        isFeatured: true,
        imageUrl:
          "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&q=80",
      },
      {
        name: "Atomberg Smart Ceiling Fan",
        slug: "atomberg-smart-ceiling-fan",
        SKU: "AT-FAN-202",
        categoryId: smartHomeId,
        stockQuantity: 45,
        description:
          "Energy-efficient BLDC motor with remote and smart home integration.",
        price: "85.00",
        compareAtPrice: "105.00",
        isActive: true,
        isFeatured: false,
        imageUrl:
          "https://images.unsplash.com/photo-1527334757348-18eeb6782337?w=500&q=80",
      },
      {
        name: "Peace Lily (Spathiphyllum)",
        slug: "peace-lily",
        SKU: "PL-001",
        categoryId: plantsId,
        stockQuantity: 30,
        description:
          "Elegant white blooms and dark green leaves. Excellent for indoor air purification.",
        price: "24.50",
        compareAtPrice: null,
        isActive: true,
        isFeatured: true,
        imageUrl:
          "https://images.unsplash.com/photo-1599598425947-330025fa48da?w=500&q=80",
      },
      {
        name: "Chinese Evergreen (Aglaonema)",
        slug: "chinese-evergreen",
        SKU: "CE-002",
        categoryId: plantsId,
        stockQuantity: 20,
        description:
          "Striking patterned foliage that thrives even in low-light conditions.",
        price: "32.00",
        compareAtPrice: "38.00",
        isActive: true,
        isFeatured: false,
        imageUrl:
          "https://images.unsplash.com/photo-1616690710400-a16d146927c5?w=500&q=80",
      },
    ])
    .returning({ id: products.id });

  console.log("Seeding product extra images...");

  // 3. Insert Extra Images using the Product IDs
  await db.insert(productImages).values([
    // Images for Philips WiZ Bulb (Index 0)
    {
      productId: insertedProducts[0].id,
      altText: "Philips WiZ Bulb Front Packaging",
      imageUrl:
        "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=500&q=80",
      sortOrder: 1,
      isPrimary: true,
    },
    {
      productId: insertedProducts[0].id,
      altText: "Philips WiZ Bulb Glowing Red",
      imageUrl:
        "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=500&q=80",
      sortOrder: 2,
      isPrimary: false,
    },
    // Images for Peace Lily (Index 2)
    {
      productId: insertedProducts[2].id,
      altText: "Peace Lily in white ceramic pot",
      imageUrl:
        "https://images.unsplash.com/photo-1599598425947-330025fa48da?w=500&q=80",
      sortOrder: 1,
      isPrimary: true,
    },
    {
      productId: insertedProducts[2].id,
      altText: "Peace Lily white flower close up",
      imageUrl:
        "https://images.unsplash.com/photo-1612363228103-b097b693dcbf?w=500&q=80",
      sortOrder: 2,
      isPrimary: false,
    },
  ]);

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
