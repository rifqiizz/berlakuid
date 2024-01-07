import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Prisma } from '@prisma/client'
//import { uploadFile } from "@/lib/uploadFile";
import slugify from "slugify";
import { verify } from "jsonwebtoken";
import { cookies } from 'next/headers';

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const limit = searchParams.get("limit");
  const searchId = searchParams.get("id");
  const idtask = searchParams.get("idtask");
  //console.log(searchParams);
  
  let tasks = null;
  let task = null;
  let tasksLimited = null;
  let tasksSumm = null;
  //let userId = "952bbd57-6f74-4aa6-86d5-104c27e072ef";
  const userId = searchId; //cookies().get("userId")?.value;
  //console.log(userId);
  //let userId = Cookies.get("userId");
  
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

    if (idtask) {
      task = await prisma.task.findUnique({
        where: {
          id: idtask,
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

    if (limit=='dashboard' && searchId) {
      tasksLimited = await prisma.task.findMany({
        where: {
            userId: searchId,
          },
          include: {
            user: {
                select: {
                  username: true,
                  //userId: userId,
                },
              },
          },
          //take: 5,
          orderBy: {
            expiryDate: 'asc',
          },
        });
        return NextResponse.json({ data: tasksLimited, message: "Dashboard Tasks fetched successfully" });
    } 

    if (limit=='summary' && searchId) {
      tasksSumm = await prisma.task.findMany({
        where: {
            userId: searchId,
          },
          include: {
            user: {
          //     /*select: {
          //       username: true,
          //       //userId: "952bbd57-6f74-4aa6-86d5-104c27e072ef",
          //     },*/
              select: {
                username: true,
              },
            },
          },  
          orderBy: {
            expiryDate: 'asc',
          }
      });
      return NextResponse.json({ data: tasksSumm, message: "Dashboard Tasks Summary fetched successfully" });
    }
      
    if(searchId)
    {
      tasks = await prisma.task.findMany({
          where: {
              userId: searchId,
            },
            include: {
              user: {
            //     /*select: {
            //       username: true,
            //       //userId: "952bbd57-6f74-4aa6-86d5-104c27e072ef",
            //     },*/
                select: {
                  username: true,
                },
              },
            },  
            orderBy: {
              expiryDate: 'asc',
            },
      });
    }

    //console.log("userId tasks: ", searchId,);
    //console.log("Tasks: ",tasks);

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
    const featuredImage = formData.get("featuredImage");
    const category = formData.get("category");
  
    // Get user id from token
    const cookieStore = cookies();
    //const token = Cookies.get("token");
    //console.log(token);
    const token = cookieStore.get("token").value;
    //console.log(token);
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
          category,
          expiryDate,
          userId,
          createdAt: new Date(),
          featuredImage: formData.get("featuredImage") || null
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
        message: "Pengingat berhasil ditambahkan",
      },
      { status: 201 }
    );
  }

  export async function PATCH(request, { params }) {
    //get params id
    const { name, description } = await request.json();
    console.log(params);
    const id = params.id;
    console.log('ID ', id);
    //get request data
    
    //console.log('Name ', name);
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