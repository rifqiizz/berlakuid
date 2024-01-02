//import next request and response
import { NextResponse } from "next/server";
//import prisma client
import prisma from "@/utils/prisma";

//export async function GET({ params }) {
  //get params id
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");
  //console.log(params);
  //exit; 
  //const id = params.id;

  //get detail post
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Error fetching categories" });
  }
  return NextResponse.json({ data: user, message: "Category fetched successfully" });
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