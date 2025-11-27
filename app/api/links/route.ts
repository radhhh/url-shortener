import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { linkFormSchema } from "@/lib/schema";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();

    const parsed = linkFormSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid data",
          issues: parsed.error,
        },
        { status: 400 },
      );
    }

    let { url, slug } = parsed.data;

    const link = await prisma.link.create({
      data: {
        url,
        slug,
      },
    });

    return NextResponse.json(
      {
        link: {
          id: link.id,
          slug: link.slug,
          url: link.url,
        },
      },
      { status: 201 },
    );
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json(
        { error: "Slug is already in use. Please choose another one." },
        { status: 409 },
      );
    }

    console.error("[POST /api/links] error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
