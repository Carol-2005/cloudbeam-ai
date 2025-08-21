// 'use client';
// import React,{useState,useEffect,useCallback} from 'react'
// import axios from 'axios';
// import VideoCard from '../../../components/VideoCard';
// import { Video } from '@/types';

// function Home() {
//   const [videos,setVideos]=useState<Video[]>([]);
//   const [loading,setLoading]=useState(true);
//   const [error,setError]=useState<string | null>(null);

//   const fetchVideos=useCallback(async()=>{
//      try {
//       const response=await axios.get('/api/video');
//       console.log("The repsonse of fetch videos is",response);
      
//       if(Array.isArray(response.data.videos)){
//         setVideos(response.data.videos);
//       }else{
//         throw new Error("Unexpected response format");
//       }
//      } catch (error) {
//       console.log(error);
//       setError("Faield to fetch videos");
      
//      }finally{
//       setLoading(false);
//      }
//   },[])

//   useEffect(()=>{
//     fetchVideos()
//   },[fetchVideos])
//   const handleDownload=useCallback((url:string,title:string)=>{
//     console.log("The handleDownload has been hit");
    
    
//       console.log("The handleDownload has been hit");
//  const link=document.createElement("a");
//     link.href=url;
//     link.setAttribute("download",`${title}.mp4`);
//     link.setAttribute("target","_self");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
  
   

//   },[])
//   if(loading){
//     return <div>Loading...</div>
//   }
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Videos</h1>
//       {videos.length === 0 ? (
//         <div className="text-center text-lg text-gray-500">
//           No videos available
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {
//             videos.map((video) => (
//                 <VideoCard
//                     key={video.id}
//                     video={video}
//                     onDownload={handleDownload}
//                 />
//             ))
//           }
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;


// //day js and filesize js---libraries very important
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import VideoCard from '../../../components/VideoCard';
import { Video } from '@/types';
import { RefreshCw, Download, AlertCircle, Video as VideoIcon, Search } from 'lucide-react';

function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/video', {
        timeout: 10000, // 10 second timeout
      });
      
      console.log("API Response:", response.data);
      
      if (response.data && Array.isArray(response.data.videos)) {
        setVideos(response.data.videos);
        setFilteredVideos(response.data.videos);
        setRetryCount(0);
      } else {
        throw new Error("Invalid response format: Expected videos array");
      }
    } catch (error:any) {
      console.error("Failed to fetch videos:", error);
      
      let errorMessage = "Failed to fetch videos";
      // if (axios.isAxiosError(error)) {
      //   if (error.code === 'ECONNABORTED') {
      //     errorMessage = "Request timeout - please try again";
      //   } else if (error.response?.status === 404) {
      //     errorMessage = "Video API endpoint not found";
      //   } else if (error.response?.status >= 500) {
      //     errorMessage = "Server error - please try again later";
      //   } else if (error.response?.data?.message) {
      //     errorMessage = error.response.data.message;
      //   }
      // }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(video =>
        video.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredVideos(filtered);
    }
  }, [searchTerm, videos]);

  const handleDownload = useCallback(async (url: string, title: string) => {
    try {
      console.log("Downloading video:", { url, title });
      
      // Show loading state for download
      const downloadingToast = document.createElement('div');
      downloadingToast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      downloadingToast.textContent = 'Preparing download...';
      document.body.appendChild(downloadingToast);
      
      // Create and trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp4`);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Remove loading toast and show success
      setTimeout(() => {
        document.body.removeChild(downloadingToast);
        const successToast = document.createElement('div');
        successToast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        successToast.textContent = 'Download started!';
        document.body.appendChild(successToast);
        
        setTimeout(() => {
          if (document.body.contains(successToast)) {
            document.body.removeChild(successToast);
          }
        }, 3000);
      }, 1000);
      
    } catch (error) {
      console.error("Download failed:", error);
      
      // Show error toast
      const errorToast = document.createElement('div');
      errorToast.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      errorToast.textContent = 'Download failed. Please try again.';
      document.body.appendChild(errorToast);
      
      setTimeout(() => {
        if (document.body.contains(errorToast)) {
          document.body.removeChild(errorToast);
        }
      }, 3000);
    }
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchVideos();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto p-6 max-w-7xl">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
            <h2 className="text-2xl font-semibold mb-2">Loading Videos</h2>
            <p className="text-gray-400">Please wait while we fetch your videos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Video Library
              </h1>
              <p className="text-gray-400">
                {videos.length > 0 
                  ? `${videos.length} video${videos.length !== 1 ? 's' : ''} available`
                  : 'Your video collection'
                }
              </p>
            </div>
            
            <button
              onClick={handleRetry}
              disabled={loading}
              className="mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Search Bar */}
          {videos.length > 0 && (
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-400 mb-2">
                  Error Loading Videos
                </h3>
                <p className="text-red-300 mb-4">{error}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleRetry}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Try Again
                  </button>
                  {retryCount > 2 && (
                    <button
                      onClick={() => window.location.reload()}
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      Reload Page
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        {!error && (
          <>
            {/* Empty State */}
            {filteredVideos.length === 0 && videos.length === 0 && (
              <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <VideoIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">No Videos Found</h2>
                <p className="text-gray-400 mb-6 max-w-md">
                  It looks like you haven't uploaded any videos yet. Start by uploading your first video!
                </p>
                <button
                  onClick={() => window.location.href = '/video-uploads'}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Upload Video
                </button>
              </div>
            )}

            {/* No Search Results */}
            {filteredVideos.length === 0 && videos.length > 0 && searchTerm && (
              <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No Results Found</h2>
                <p className="text-gray-400 mb-4">
                  No videos match "{searchTerm}". Try a different search term.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Video Grid */}
            {filteredVideos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            )}

            {/* Search Results Info */}
            {searchTerm && filteredVideos.length > 0 && (
              <div className="mt-8 text-center text-gray-400">
                Showing {filteredVideos.length} of {videos.length} videos
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
