//import next request and response
import { NextResponse } from "next/server";
//import prisma client
import prisma from "@/utils/prisma";

//export async function GET({ params }) {
  //get params id
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("slug");
  
  let user = null;
  try {
    if (id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      return NextResponse.json({ data: user, message: "User information fetched successfully" });
    }

    users = await prisma.user.findMany({
      
    });
    return NextResponse.json({ data: users, message: "All Users fetched successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching users" });
  } 
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