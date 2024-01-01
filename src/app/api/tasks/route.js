import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
//import { uploadFile } from "@/lib/uploadFile";
import slugify from "slugify";
import { verify } from "jsonwebtoken";
import { getUser } from "@/components/auth/hooks/getUser";

export async function GET(request) {
  const { user } = getUser();
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const limit = searchParams.get("limit");
  //console.log(searchParams);
  console.log({user});
  
  let tasks = null;
  let task = null;
  let tasksLimited = null;
  let tasksCounted = null;
  //let userId = "952bbd57-6f74-4aa6-86d5-104c27e072ef";
  let userId = null;
  if(user) userId = {user.userId};
  
  try {
    if (slug) {
      task = await prisma.task.findUnique({
        where: {
          slug,
        },
        include: {
            user: {
                select: {
                  username: true,
                  //userId: userId,
                },
              },
        },
      });

      return NextResponse.json({ data: task, message: "Tasks fetched successfully" });
    }

    if (limit=='dashboard') {
      tasksLimited = await prisma.task.findMany({
        where: {
            userId,
          },
        take: 5,
        });
        return NextResponse.json({ data: tasksLimited, message: "Dashboard Tasks fetched successfully" });
    } 

    if (limit=='summary') {
      tasksCounted = await prisma.$queryRaw(
        Prisma.sql`SELECT COUNT(id) FROM task WHERE userId = ${userId}`
      );
      //console.log(tasksCounted);
      return NextResponse.json({ data: tasksCounted, message: "Counted Tasks fetched successfully" });
      //console.log('Average age:' + aggregations._avg.age)
    }
      
    
    tasks = await prisma.task.findMany({
        where: {
            userId,
          },
    });

    return NextResponse.json({ data: tasks, message: "All Tasks fetched successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching tasks" });
  } 
}


export async function POST(request) {
    const formData = await request.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const dayReminder = formData.get("dayReminder");
    const expiryDate = formData.get("expiryDate");
    //const featuredImage = formData.get("featuredImage");
    const category = formData.get("category");
  
    // Get user id from token
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;
    const decoded = verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
  
    let taskId = "";
  
    // Save product ke database
    try {
      const createTask = await prisma.task.create({
        data: {
          name,
          slug: slugify(name, { lower: true, replacement: "-" }),
          description,
          dayReminder: Number(dayReminder),
          //featuredImage: featuredImage.name,
          category,
          expiryDate,
          userId,
          createdAt: new Date(),
        },
      });
  
      taskId = createTask.id;
      console.log(createTask);
    } catch (error) {
      console.log(error);
    }
  
    // Send Image ke AWS S3
/*     try {
      //   Upload featured image file
      const uploadFeaturedImage = await uploadFile({
        Body: featuredImage,
        Key: featuredImage.name,
        ContentType: featuredImage.type,
        Dir: `products/${productId}`,
      });
      console.log(uploadFeaturedImage);
  
      //   Upload images file
      images.forEach(async (item) => {
        const uploadFeaturedImage = await uploadFile({
          Body: item,
          Key: item.name,
          ContentType: item.type,
          Dir: `products/${productId}`,
        });
        console.log(uploadFeaturedImage);
      });
    } catch (error) {
      console.log(error);
    }
 */  
    return NextResponse.json(
      {
        message: "Task created successfully",
      },
      { status: 201 }
    );
  }