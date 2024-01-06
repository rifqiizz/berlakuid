//import next request and response
import { NextResponse } from "next/server";
import slugify from "slugify";
//import prisma client
import prisma from "@/utils/prisma";

export async function GET(request, { params }) {
  //get params id
  const id = params.id;

  //get detail post
  const post = await prisma.task.findUnique({
    where: {
      id,
    },
  });

  if (!task) {
    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: "Detail Data Task Not Found!",
        data: null,
      },
      {
        status: 404,
      }
    );
  }

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Detail Data Task",
      data: task,
    },
    {
      status: 200,
    }
  );
}

export async function PATCH(request, { params }) {
  //get params id
  const id = params.id;

  //get request data
  const { name, description, dayReminder, category, expiryDate } = await request.json();

  //update data
  const post = await prisma.task.update({
    where: {
      id,
    },
    data: {
      name: name,
      slug: slugify(name, { lower: true, replacement: "-" }),
      description: description,
      updatedAt: new Date(),
      dayReminder: Number(dayReminder),
      category:category,
      expiryDate:expiryDate,
       
    },
  });

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Pengingat berhasil disimpan",
      data: post,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(request, { params }) {
  //get params id
  const id = params.id;

  //delete data
  await prisma.task.delete({
    where: {
      id,
    },
  });

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Pengingat berhasil dihapus",
    },
    {
      status: 200,
    }
  );
}