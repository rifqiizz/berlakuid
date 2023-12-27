import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
//import { uploadFile } from "@/lib/uploadFile";
import slugify from "slugify";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");

  console.log("Mulai API Task");

  let tasks = null;

  try {
    if (slug) {
      const task = await prisma.task.findUnique({
        where: {
          slug,
        },
        include: {
          task: {
            
          },
        },
      });

      return NextResponse.json({ data: task, message: "Tasks fetched successfully" });
    }

    tasks = await prisma.task.findMany({
      
    });
    return NextResponse.json({ data: tasks, message: "All Tasks fetched successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching tasks" });
  } 

  //return NextResponse.json({ message: "Im trying fetching categories" });
}