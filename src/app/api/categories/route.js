import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
//import { uploadFile } from "@/lib/uploadFile";
import slugify from "slugify";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  console.log("Mulai API Task categories");

  let tasks = null;

  try {
    if (slug) {
      const category = await prisma.category.findUnique({
        where: {
          slug,
        },
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      });

      return NextResponse.json({ data: category, message: "Category fetched successfully" });
    }

    categories = await prisma.category.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return NextResponse.json({ data: categories, message: "All Categories fetched successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching categories" });
  }
}