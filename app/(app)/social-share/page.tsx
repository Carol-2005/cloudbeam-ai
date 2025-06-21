// //what i learnt is that there are two ways of perorminga  preview onw in lcal with new FileReader() and the other is using cloudinary public Id
// 'use client'
// import React,{useState,useEffect,useRef} from 'react'
// import { CldImage } from 'next-cloudinary';
// const socialFormats={
//   "Instagram Square (1:1)":{width:1080,height:1080,aspectRatio:"1:1"},
//   "Instagram Potrait (4:4)":{width:1080,height:1350,aspectRatio:"4:5"},
//   "Twitter Post (16:9)":{width:1200,height:675,aspectRatio:"16:9"},
//   "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
//     "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
// }
// type  SocialFormat=keyof typeof socialFormats
// export default function Social() {
//   const [uploadedImage,setUploadedImage]=useState<string |null>(null);
//   const [selectedFormat,setSelectedFormat]=useState<SocialFormat>("Instagram Square (1:1)");
//   const [isUploading, setIsUploading] = useState(false);
//   const imgRef=useRef<HTMLImageElement>(null);
//     const [isTransforming, setIsTransforming] = useState(false);
//     const imageRef = useRef<HTMLImageElement>(null);
//     useEffect(()=>{
//        if(uploadedImage){
//         setIsTransforming(true);
//        }
//     },[selectedFormat,uploadedImage])

//     const handleFileUpload=async(e:React.ChangeEvent<HTMLInputElement>)=>{
//         setIsUploading(true);
//       const file=e.target.files?.[0];
//       console.log("The file is",file);
      
//       if(!file)return;  
//       const formData=new FormData();
//       formData.append('file',file);
//       try {
//         console.log("The function is hit");
        
//         const response=await fetch('/api/image-upload',{
//           method:'POST',
//           body:formData
//         })
//         if(!response.ok) throw new Error("Failed to upload image");

//         const data=await response.json();
//         setUploadedImage(data.publicId);
//         console.log("The publicid is",data.publicId);
        
//       } catch (error) {
//         console.log(error)
//             alert("Failed to upload image");
//       }finally{
//         setIsUploading(false);
//     }

//     }

//     const handleDownload=()=>{
//      if(!imageRef.current) return;

//      fetch(imageRef.current.src)
//      .then((response)=>response.blob())
//      .then((blob)=>{
//       const url=window.URL.createObjectURL(blob);
//       const link=document.createElement("a");
//       link.href=url;
//       link.download=`${selectedFormat.replace(/\s+/g,"_").toLowerCase()}.png`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);
      
//      })
//     }
//   return (
//     <div className="container mx-auto p-4 max-w-4xl">
//           <h1 className="text-3xl font-bold mb-6 text-center">
//             Social Media Image Creator
//           </h1>

//           <div className="card">
//             <div className="card-body">
//               <h2 className="card-title mb-4">Upload an Image</h2>
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Choose an image file</span>
//                 </label>
//                 <input
//                   type="file"
//                   onChange={handleFileUpload}
//                   className="file-input file-input-bordered file-input-primary w-full"
//                 />
//               </div>

//               {isUploading && (
//                 <div className="mt-4">
//                   <progress className="progress progress-primary w-full"></progress>
//                 </div>
//               )}

//               {uploadedImage && (
//                 <div className="mt-6">
//                   <h2 className="card-title mb-4">Select Social Media Format</h2>
//                   <div className="form-control">
//                     <select
//                       className="select select-bordered w-full"
//                       value={selectedFormat}
//                       onChange={(e) =>
//                         setSelectedFormat(e.target.value as SocialFormat)
//                       }
//                     >
//                       {Object.keys(socialFormats).map((format) => (
//                         <option key={format} value={format}>
//                           {format}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="mt-6 relative">
//                     <h3 className="text-lg font-semibold mb-2">Preview:</h3>
//                     <div className="flex justify-center">
//                       {isTransforming && (
//                         <div className="absolute inset-0 flex items-center justify-center bg-base-100 bg-opacity-50 z-10">
//                           <span className="loading loading-spinner loading-lg"></span>
//                         </div>
//                       )}
//                       <CldImage
//                         width={socialFormats[selectedFormat].width}
//                         height={socialFormats[selectedFormat].height}
//                         src={uploadedImage}
//                         sizes="100vw"
//                         alt="transformed image"
//                         crop="fill"
//                         aspectRatio={socialFormats[selectedFormat].aspectRatio}
//                         gravity='auto'
//                         ref={imageRef}
//                         onLoad={() => setIsTransforming(false)}
//                         />
//                     </div>
//                   </div>

//                   <div className="card-actions justify-end mt-6">
//                     <button className="btn btn-primary" onClick={handleDownload}>
//                       Download for {selectedFormat}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//   )
// }
'use client'
import React, { useState, useEffect, useRef } from 'react'
import { CldImage } from 'next-cloudinary'

const socialFormats = {
  "Instagram Square (1:1)": { width: 1080, height: 1080, aspectRatio: "1:1" },
  "Instagram Portrait (4:5)": { width: 1080, height: 1350, aspectRatio: "4:5" },
  "Twitter Post (16:9)": { width: 1200, height: 675, aspectRatio: "16:9" },
  "Twitter Header (3:1)": { width: 1500, height: 500, aspectRatio: "3:1" },
  "Facebook Cover (205:78)": { width: 820, height: 312, aspectRatio: "205:78" },
}

const features = [
  {
    title: "Smart Cropping",
    description: "Automatically crops images to perfect social media dimensions",
    icon: "✂️",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Background Removal",
    description: "Remove backgrounds instantly with AI-powered technology",
    icon: "🎭",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Multiple Formats",
    description: "Support for Instagram, Twitter, Facebook and more platforms",
    icon: "📱",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Instant Download",
    description: "Download your perfectly sized images in seconds",
    icon: "⚡",
    color: "from-orange-500 to-orange-600"
  }
]

type SocialFormat = keyof typeof socialFormats

export default function Social() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>("Instagram Square (1:1)")
  const [isUploading, setIsUploading] = useState(false)
  const [isTransforming, setIsTransforming] = useState(false)
  const [removeBackground, setRemoveBackground] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true)
    }
  }, [selectedFormat, uploadedImage, removeBackground])

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true)
    const file = e.target.files?.[0]
    
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await fetch('/api/image-upload', {
        method: 'POST',
        body: formData
      })
      
      if (!response.ok) throw new Error("Failed to upload image")

      const data = await response.json()
      setUploadedImage(data.publicId)
    } catch (error) {
      console.log(error)
      alert("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = () => {
    if (!imageRef.current) return

    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${selectedFormat.replace(/\s+/g, "_").toLowerCase()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
      })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Social Media Image Creator
          </h1>
          <p className="text-gray-400 text-lg">
            Transform your images for any social platform with AI-powered tools
          </p>
        </div>

        {/* Features Section */}
        {!uploadedImage && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 hover:scale-105 border border-gray-700"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Section */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <span className="mr-2">📁</span>
            Upload Your Image
          </h2>
          
          <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors duration-300">
            <input
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
              accept="image/*"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl mb-4">
                📸
              </div>
              <span className="text-lg font-medium text-blue-400 hover:text-blue-300">
                Choose an image file
              </span>
              <span className="text-gray-400 text-sm mt-2">
                PNG, JPG, JPEG up to 10MB
              </span>
            </label>
          </div>

          {isUploading && (
            <div className="mt-6">
              <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full w-full animate-pulse"></div>
              </div>
              <p className="text-center text-gray-400 mt-2">Uploading...</p>
            </div>
          )}
        </div>

        {/* Format Selection and Preview */}
        {uploadedImage && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Controls */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="mr-2">⚙️</span>
                Customization
              </h2>
              
              {/* Format Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Social Media Format
                </label>
                <select
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value as SocialFormat)}
                >
                  {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              {/* Background Removal Toggle */}
              <div className="mb-6">
                <button
                  onClick={() => setRemoveBackground(!removeBackground)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                    removeBackground
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-700 border border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <span className="mr-2">🎭</span>
                  {removeBackground ? 'Background Removed' : 'Remove Background'}
                </button>
              </div>

              {/* Format Info */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium mb-2">Current Format Details</h3>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>Dimensions: {socialFormats[selectedFormat].width} × {socialFormats[selectedFormat].height}</div>
                  <div>Aspect Ratio: {socialFormats[selectedFormat].aspectRatio}</div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <span className="mr-2">👁️</span>
                Preview
              </h2>
              
              <div className="relative">
                {isTransforming && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-10 rounded-lg">
                    <div className="text-center">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <span className="text-sm text-gray-400">Transforming...</span>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-center bg-gray-700 rounded-lg p-4">
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes="100vw"
                    alt="transformed image"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity="auto"
                    removeBackground={removeBackground}
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <span className="mr-2">⬇️</span>
                Download for {selectedFormat}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}