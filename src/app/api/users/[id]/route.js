//import next request and response
import { NextResponse } from "next/server";

//import prisma client
import prisma from "@/utils/prisma";

export async function GET({ params }) {
  //get params id
  const id = params.id;

  //get detail post
  const post = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    //return response JSON
    return NextResponse.json(
      {
        sucess: true,
        message: "Detail Data User Not Found!",
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
      message: "Detail Data User",
      data: user,
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
  const post = await prisma.user.update({
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
      message: "Data User Updated!",
      data: user,
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
  await prisma.user.delete({
    where: {
      id,
    },
  });

  //return response JSON
  return NextResponse.json(
    {
      sucess: true,
      message: "Data User Deleted!",
    },
    {
      status: 200,
    }
  );
}