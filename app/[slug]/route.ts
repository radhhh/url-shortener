import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createHash } from "crypto";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const link = await prisma.link.findUnique({
    where: {
      slug,
      active: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
  });

  if (!link) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const ip = req.headers.get("x-forwarded-for") || undefined;

  const clickEvent = await prisma.clickEvent.create({
    data: {
      linkId: link.id,
      ipHash: ip ? createHash("sha256").update(ip).digest("hex") : undefined,
      userAgent: req.headers.get("user-agent") || undefined,
      referer: req.headers.get("referer") || undefined,
      country: req.headers.get("x-vercel-ip-country") || undefined,
    },
  });

  return NextResponse.redirect(link.url);
}
