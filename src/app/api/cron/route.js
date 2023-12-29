import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/prisma";

export async function GET(request) {
  console.log("Mulai API cron send email");

  let categories = null;

  try {
    return NextResponse.json({ message: "Run sending email successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error sending email" });
  } 
}

/*export async function POST(req) {
  const { name } = await req.json();

  try {
    // Create hashed password
    console.log('Pure: ',name);
    const hashedName = await bcrypt.hash(name, 10);
    console.log('Hashed: ',hashedName);
    // Create user to database
    const createCron = await prisma.trialcron.create({
      data: {
        name: hashedName
      }
    });
    console.log('Isi data: ',createCron);

    return NextResponse.json({ data: createCron, message: "User created successfully" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errorMessage: "Something went wrong. Please try again later" }, { status: 500 });
  }
}*/
