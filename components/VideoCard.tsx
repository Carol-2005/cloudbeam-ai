// 'use client';
// import React,{useState,useCallback,useEffect} from "react";
// import { Video } from "@/types";
// import { getCldImageUrl,getCldVideoUrl } from "next-cloudinary";
// import { Download, Clock, FileDown, FileUp } from "lucide-react";
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
// import {filesize} from 'fileSize';
// dayjs.extend(relativeTime);

// interface VideoCardProps{
//     video:Video;
//     onDownload:(url:string,title:string)=>void;
// }

//  const VideoCard:React.FC<VideoCardProps>=({video,onDownload})=>{
//     const [isHovered,setIsHovered]=useState(false);
//     const [previewError,setPreviewError]=useState(false);

//     const getThumbnailUrl=useCallback((publicId:string)=>{
//         return getCldImageUrl({
//             src:publicId,
//             width:400,
//             height:225,
//             crop:"fill",
//             gravity:"auto",
//             format:"jpg",
//             quality:"auto",
//             assetType:"video"
//         })
//     },[])

    
//     const getFullVideoUrl=useCallback((publicId:string)=>{
      
//         return getCldVideoUrl({
         
//             src:publicId,
//             width:1920,
//             height:1080,
//             crop:"fill",
            
//         })
//     },[])
    
    
//     const getPreviewVideoUrl=useCallback((publicId:string)=>{
//         return getCldVideoUrl({
//             src:publicId,
//             width:400,
//             height:225,
//             rawTransformations:["e_preview:duration_15:max_seg_9:min_seg_dur_1"]
            
//         })
//     },[])
//     const formatSize=useCallback((size:number)=>{
//         return filesize(size);
//     },[])
//     const formatDuration = useCallback((seconds: number) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = Math.round(seconds % 60);
//         return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
//       }, []);
//     const compressionPercentage = Math.round(
//         (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
//       );

//       useEffect(() => {
//         setPreviewError(false);
//       }, [isHovered]);

//       const handlePreviewError = () => {
//         setPreviewError(true);
//       };
//     return(
//         <div
//         className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <figure className="aspect-video relative">
//           {isHovered ? (
//             previewError ? (
//               <div className="w-full h-full flex items-center justify-center bg-gray-200">
//                 <p className="text-red-500">Preview not available</p>
//               </div>
//             ) : (
//               <video
//                 src={getPreviewVideoUrl(video.publicId)}
//                 autoPlay
//                 muted
//                 loop
//                 className="w-full h-full object-cover"
//                 onError={handlePreviewError}
//               />
//             )
//           ) : (
//             <img
//               src={getThumbnailUrl(video.publicId)}
//               alt={video.title}
//               className="w-full h-full object-cover"
//             />
//           )}
//           <div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
//             <Clock size={16} className="mr-1" />
//             {formatDuration(video.duration)}
//           </div>
//         </figure>
//         <div className="card-body p-4">
//           <h2 className="card-title text-lg font-bold">{video.title}</h2>
//           <p className="text-sm text-base-content opacity-70 mb-4">
//             {video.description}
//           </p>
//           <p className="text-sm text-base-content opacity-70 mb-4">
//             Uploaded {dayjs(video.createdAt).fromNow()}
//           </p>
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div className="flex items-center">
//               <FileUp size={18} className="mr-2 text-primary" />
//               <div>
//                 <div className="font-semibold">Original</div>
//                 <div>{formatSize(Number(video.originalSize))}</div>
//               </div>
//             </div>
//             <div className="flex items-center">
//               <FileDown size={18} className="mr-2 text-secondary" />
//               <div>
//                 <div className="font-semibold">Compressed</div>
//                 <div>{formatSize(Number(video.compressedSize))}</div>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-between items-center mt-4">
//             <div className="text-sm font-semibold">
//               Compression:{" "}
//               <span className="text-accent">{compressionPercentage}%</span>
//             </div>
//             <button
//               className="btn btn-primary btn-sm"
//               onClick={() =>
//                 onDownload(getFullVideoUrl(video.publicId), video.title)
//               }
//             >
//               <Download size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     )
// }

// export default VideoCard;


'use client';
import React, { useState, useCallback, useEffect } from "react";
import { Video } from "@/types";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { 
  Download, 
  Clock, 
  FileDown, 
  FileUp, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  
  Calendar,
  TrendingDown,
  AlertCircle,
  Share2,
  Eye
} from "lucide-react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { filesize } from 'filesize';

dayjs.extend(relativeTime);

interface VideoCardProps {
  video: Video;
  onDownload: (url: string, title: string) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [thumbnailError, setThumbnailError] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const getThumbnailUrl = useCallback((publicId: string) => {
    return getCldImageUrl({
      src: publicId,
      width: 400,
      height: 225,
      crop: "fill",
      gravity: "auto",
      format: "jpg",
      quality: "auto",
      assetType: "video"
    });
  }, []);

  const getFullVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 1920,
      height: 1080,
      crop: "fill",
      quality: "auto"
    });
  }, []);

  const getPreviewVideoUrl = useCallback((publicId: string) => {
    return getCldVideoUrl({
      src: publicId,
      width: 400,
      height: 225,
      rawTransformations: ["e_preview:duration_15:max_seg_9:min_seg_dur_1"]
    });
  }, []);

  const formatSize = useCallback((size: number) => {
    return filesize(size);
  }, []);

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  const compressionPercentage = Math.round(
    (1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
  );

  useEffect(() => {
    setPreviewError(false);
  }, [isHovered]);

  const handlePreviewError = () => {
    setPreviewError(true);
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload(getFullVideoUrl(video.publicId), video.title);
    } finally {
      setIsDownloading(false);
    }
  };

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef) {
      videoRef.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: getFullVideoUrl(video.publicId)
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(getFullVideoUrl(video.publicId));
      // You could show a toast here
    }
  };

  return (
    <div
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video/Thumbnail Section */}
      <div className="aspect-video relative group">
        {isHovered && !previewError ? (
          <div className="relative">
            <video
              ref={setVideoRef}
              src={getPreviewVideoUrl(video.publicId)}
              autoPlay
              muted={isMuted}
              loop
              className="w-full h-full object-cover"
              onError={handlePreviewError}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={togglePlayPause}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {thumbnailError ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-700 text-gray-400">
                <AlertCircle className="w-12 h-12 mb-2" />
                <p className="text-sm">Thumbnail not available</p>
              </div>
            ) : (
              <img
                src={getThumbnailUrl(video.publicId)}
                alt={video.title}
                className="w-full h-full object-cover"
                onError={handleThumbnailError}
              />
            )}
            
            {/* Play Overlay for Thumbnail */}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 hover:opacity-100 transition-opacity duration-200">
                <div className="bg-black bg-opacity-50 text-white p-3 rounded-full">
                  <Play className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg text-xs flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {formatDuration(video.duration)}
        </div>

        {/* Preview Error Message */}
        {previewError && isHovered && (
          <div className="absolute top-2 left-2 bg-red-600 bg-opacity-90 text-white px-2 py-1 rounded text-xs">
            Preview unavailable
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 leading-tight">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
              {video.description}
            </p>
          )}
        </div>

        {/* Upload Date */}
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Uploaded {dayjs(video.createdAt).fromNow()}</span>
        </div>

        {/* File Size Information */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <FileUp className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-xs font-medium text-gray-300">Original</span>
            </div>
            <div className="text-white font-semibold">
              {formatSize(Number(video.originalSize))}
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <FileDown className="w-4 h-4 mr-2 text-green-400" />
              <span className="text-xs font-medium text-gray-300">Compressed</span>
            </div>
            <div className="text-white font-semibold">
              {formatSize(Number(video.compressedSize))}
            </div>
          </div>
        </div>

        {/* Compression Badge */}
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-full px-3 py-1 flex items-center">
            <TrendingDown className="w-4 h-4 mr-2 text-white" />
            <span className="text-white font-semibold text-sm">
              {compressionPercentage}% smaller
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
          >
            {isDownloading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            {isDownloading ? 'Downloading...' : 'Download'}
          </button>
          
          <button
            onClick={handleShare}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-200"
            title="Share video"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => window.open(getFullVideoUrl(video.publicId), '_blank')}
            className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors duration-200"
            title="View full video"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
