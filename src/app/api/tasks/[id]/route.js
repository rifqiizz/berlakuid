//import next request and response
import { NextResponse } from "next/server";

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
  const { name, description } = await request.json();

  //update data
  const post = await prisma.task.update({
    where: {
      id,
    },
    data: {
      name: name,
      description: description,
      updatedAt: new Date(),
    },
  });

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Data Task Updated!",
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
      message: "Data Task Deleted!",
    },
    {
      status: 200,
    }
  );
}