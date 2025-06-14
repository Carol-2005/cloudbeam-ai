import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { desc } from "framer-motion/client";

const prisma=new PrismaClient();
export async function GET(request: NextRequest){
    try {
     const videos=   await prisma.video.findMany({
            orderBy:{
                createdAt:"desc"
            }
        })
        return NextResponse.json({
            status: 200,
            data: videos
          });
    } catch (error) {
        return NextResponse.json({error:"Fetching videos"},
            {status:500}
        )
    }finally{
        await prisma.$disconnect;
    }
}