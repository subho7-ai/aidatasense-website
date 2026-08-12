import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const courses = [
    {
      title: "Lakehouse Architecture with Databricks",
      description: "Placeholder description — replace with real course copy.",
      priceCents: 4900,
      currency: "usd",
      stripePriceId: "price_placeholder_databricks",
      isPublished: true,
    },
    {
      title: "Cloud Data Warehousing with Snowflake",
      description: "Placeholder description — replace with real course copy.",
      priceCents: 4900,
      currency: "usd",
      stripePriceId: "price_placeholder_snowflake",
      isPublished: true,
    },
    {
      title: "Agentic AI in Production",
      description: "Placeholder description — replace with real course copy.",
      priceCents: 5900,
      currency: "usd",
      stripePriceId: "price_placeholder_agentic_ai",
      isPublished: true,
    },
  ];

  for (const course of courses) {
    await prisma.course.upsert({
      where: { stripePriceId: course.stripePriceId },
      update: {},
      create: course,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
