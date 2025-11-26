import { PrismaClient, Prisma } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const linkData: Prisma.LinkCreateInput[] = [
  {
    slug: "example",
    url: "https://www.example.com",
  },
  {
    slug: "google",
    url: "https://www.google.com",
  },
];

export async function main() {
  for (const l of linkData) {
    await prisma.link.create({ data: l });
  }
}

main();
