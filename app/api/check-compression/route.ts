// app/api/check-compression/route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: NextRequest) {
    console.log(request);
    
    const { userId } = await auth();
    
    if (!userId) {
        return NextResponse.json({
            error: "Unauthorized user. Please Log in"
        }, { status: 401 });
    }

    try {
        const { videoId } = await request.json();
        
        if (!videoId) {
            return NextResponse.json({
                error: "videoId is required"
            }, { status: 400 });
        }

        // Get video from database
        const video = await prisma.video.findUnique({
            where: { id: videoId }
        });

        if (!video) {
            return NextResponse.json({
                error: "Video not found"
            }, { status: 404 });
        }

        console.log(`Checking compression status for video: ${video.titleName}`);

        // Get current status from Cloudinary
        const resource = await cloudinary.api.resource(video.publicId, {
            resource_type: "video"
        });
        
        console.log("Cloudinary resource eager status:", resource.eager);

        const compressionStatus = {
            isProcessing: true,
            compressedSize: video.compressedSize,
            originalSize: video.originalSize,
            updated: false,
            eagerStatus: 'not_found'
        };

        if (resource.eager && resource.eager.length > 0) {
            const eagerTransform = resource.eager[0];
            compressionStatus.eagerStatus = eagerTransform.status || 'unknown';
            
            console.log("Eager transformation details:", {
                status: eagerTransform.status,
                bytes: eagerTransform.bytes,
                url: eagerTransform.secure_url
            });

            if (eagerTransform.bytes && eagerTransform.status !== 'processing') {
                const newCompressedSize = String(eagerTransform.bytes);
                
                // Update database if size has changed
                if (newCompressedSize !== video.compressedSize) {
                    await prisma.video.update({
                        where: { id: videoId },
                        data: {
                            compressedSize: newCompressedSize
                        }
                    });
                    
                    compressionStatus.compressedSize = newCompressedSize;
                    compressionStatus.updated = true;
                    compressionStatus.isProcessing = false;
                    
                    console.log(`✅ Updated compressed size: ${newCompressedSize} bytes`);
                } else {
                    compressionStatus.isProcessing = false;
                    console.log(`✅ Compression already up to date: ${newCompressedSize} bytes`);
                }
            } else {
                console.log(`⏳ Still processing... Status: ${eagerTransform.status}`);
            }
        } else {
            console.log("❌ No eager transformation found");
        }

        return NextResponse.json({
            success: true,
            video: {
                id: video.id,
                title: video.titleName,
                publicId: video.publicId
            },
            compression: compressionStatus,
            message: compressionStatus.updated ? 
                     "Compression completed and updated" : 
                     compressionStatus.isProcessing ? 
                     "Compression still in progress" : 
                     "Compression already completed"
        }, { status: 200 });

    } catch (error: any) {
        console.error("Check compression error:", error);
        return NextResponse.json({
            success: false,
            error: "Failed to check compression status",
            detail: error.message || "Unknown error occurred"
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// GET endpoint to check all videos that might need compression updates
export async function GET(request: NextRequest) {
    const { userId } = await auth();
    
    if (!userId) {
        return NextResponse.json({
            error: "Unauthorized user. Please Log in"
        }, { status: 401 });
    }

    try {
        // Get recent videos (last 24 hours) to check compression status
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        
        const videos = await prisma.video.findMany({
            where: {
                createdAt: {
                    gte: twentyFourHoursAgo
                }
            },
            select: {
                id: true,
                publicId: true,
                titleName: true,
                originalSize: true,
                compressedSize: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const results = [];
        let updatedCount = 0;
        
        for (const video of videos) {
            try {
                console.log(`Checking video: ${video.titleName}`);
                
                const resource = await cloudinary.api.resource(video.publicId, {
                    resource_type: "video"
                });
                
                const videoResult = {
                    ...video,
                    compressionStatus: 'processing',
                    updated: false,
                    error: null
                };
                
                if (resource.eager && resource.eager.length > 0) {
                    const eagerTransform = resource.eager[0];
                    
                    if (eagerTransform.bytes && eagerTransform.status !== 'processing') {
                        const newCompressedSize = String(eagerTransform.bytes);
                        
                        if (newCompressedSize !== video.compressedSize) {
                            // Update database
                            await prisma.video.update({
                                where: { id: video.id },
                                data: {
                                    compressedSize: newCompressedSize
                                }
                            });
                            
                            videoResult.compressedSize = newCompressedSize;
                            videoResult.updated = true;
                            updatedCount++;
                        }
                        
                        videoResult.compressionStatus = 'completed';
                    } else {
                        videoResult.compressionStatus = eagerTransform.status || 'processing';
                    }
                } else {
                    videoResult.compressionStatus = 'no_eager_transform';
                }
                
                results.push(videoResult);
                
            } catch (error:unknown) {
                const err = error as Error; // Type assertion
                results.push({
                    ...video,
                    compressionStatus: 'error',
                    error: err.message,
                    updated: false
                });
            }
        }

        return NextResponse.json({
            success: true,
            totalVideos: videos.length,
            updatedVideos: updatedCount,
            videos: results,
            message: `Checked ${videos.length} videos, updated ${updatedCount} compression sizes`
        }, { status: 200 });

    } catch (error: unknown) {
        console.error("Bulk check error:", error);
        const err = error as Error; // Type assertion
        return NextResponse.json({
            success: false,
            error: "Failed to check videos",
            detail: err.message || "Unknown error occurred"
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}