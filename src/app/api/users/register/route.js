import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/prisma";

export async function POST(req) {
  const { firstName, lastName, username, email, password } = await req.json();

  try {
    // Create hashed password
    console.log('Pure: ',password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed: ',hashedPassword);
    // Create user to database
    const createUser = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: hashedPassword,
      }
    });
    console.log('Isi data: ',createUser);

    return NextResponse.json({ data: createUser, message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errorMessage: "Something went wrong. Please try again later" }, { status: 500 });
  }
}
