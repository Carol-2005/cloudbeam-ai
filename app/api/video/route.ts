import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
//import { desc } from "framer-motion/client";

const prisma=new PrismaClient();
export async function GET(request: NextRequest){
console.log(request);

    try {
     const videos=   await prisma.video.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })
        console.log("The videos are",videos);
        
        return NextResponse.json({
             videos
          });
    } catch (error:string | unknown) {
        return NextResponse.json({error:"Fetching videos"},
            {status:500}
        )
        console.log(error);
        
    }finally{
        await prisma.$disconnect();
    }
}