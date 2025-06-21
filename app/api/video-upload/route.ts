import { NextRequest,NextResponse } from "next/server";
import { v2 as cloudinary,UploadApiResponse} from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

interface CloudinaryUploadResult{
    public_id:string;
    bytes:number;
    duration?:number;
    [key:string]:any
}

export async function POST(request:NextRequest){
    const {userId}=await auth();
   if(!userId){
    return NextResponse.json({
        error:"Unauthorized user.Please Log in"
    },{status:400})
   }

   if(
    !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET 
   ){
   return NextResponse.json({
    error:"Credentials not found"
   },{
    status:500
   })
   }

   try {
    const formData=await request.formData();
     const file=formData.get('file') as File || null;
     const titleName=formData.get('title') as string;
     const description=formData.get('description') as string;
        const originalSize=formData.get('originalSize') as string;
     
     if(!file){
        return NextResponse.json({error:"File not found"},{status:400});

    }
      const bytes=await file.arrayBuffer();
      const buffer=Buffer.from(bytes);
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
       const uploadStream=cloudinary.uploader.upload_stream(
        {
            resource_type:"video",
            folder:"video-uploads",
            transformation:[      //transformations replave the original with the compressed one directly to parallel urls to deal with
                {
                quality:"auto",
                fetch_format:"mp4"
                }
              
            ]
        },
            
        (error,result)=>{
            if(error) reject(error)
                else resolve(result as UploadApiResponse)
        }
       )
       uploadStream.end(buffer);
    })
    
       
         
     
      console.log("The result is",result);
     // console.log("eager thingy is",result.eager[0].secure_url);
     
     
    const video=await prisma.video.create({
        data:{
            titleName,
            description,
            publicId:result.public_id,
            originalSize:originalSize,
            compressedSize:String(result.bytes),
          
            duration:result.duration ||0
        }
    })
    return NextResponse.json(
        {   video:video,
            message:"Video uploaded"
        },{
         
            status:200,
        }
        )

   }  catch (error: any) {
    console.error("Upload error:", error.response?.data || error.message);
    // response.status(500).json({ error: "Upload failed", detail: error.message });
    return NextResponse.json({
        error: "Upload failed",
        detail: error.message || "Unknown error occurred"
    }, { status: 500 });
  }finally {
    await prisma.$disconnect();
}
  

}
