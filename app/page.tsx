// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
import React from 'react';
import Spline from '@splinetool/react-spline/next';
// Placeholder for Spline component - replace with actual import
// const SplinePlaceholder = () => (
//   <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center rounded-lg">
//     <div className="text-center text-white/80">
//       <div className="w-32 h-32 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
//         <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
//       </div>
//       <p className="text-sm">Spline 3D Scene</p>
//       <p className="text-xs opacity-60">Replace with your actual Spline component</p>
//     </div>
//   </div>
// );

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            MediaAI
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Products</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Solutions</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a>
            <a href="/home">
            <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-2 rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300" >
              Get Started
            </button>
            </a>
            
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)]">
            
            {/* Left Side - Text Content */}
            <div className="space-y-8 lg:pr-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    Brands that don't just deliver —{' '}
                  </span>
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    they empower
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  AI-powered media tools for real-time cropping, compression, and content delivery — built for the modern web.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105">
                  Start Free Trial
                </button>
                <button className="border border-gray-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/5 hover:border-gray-400 transition-all duration-300">
                  Watch Demo
                </button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10 backdrop-blur-sm">
                  ⚡ Real-time Processing
                </span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10 backdrop-blur-sm">
                  🤖 AI-Powered
                </span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/10 backdrop-blur-sm">
                  🚀 Built for Scale
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    99.9%
                  </div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    50ms
                  </div>
                  <div className="text-sm text-gray-400">Response Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    10M+
                  </div>
                  <div className="text-sm text-gray-400">Images Processed</div>
                </div>
              </div>
            </div>

            {/* Right Side - Spline 3D Component */}
            <div className="relative h-[600px] lg:h-[700px] max-w-full">
              {/* <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm"> */}
                {/* Replace SplinePlaceholder with your actual Spline component */}
                


      <Spline
        scene="https://prod.spline.design/978z90yNm2tj6MOJ/scene.splinecode" 
      />
  

              {/* </div> */}
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40 blur-xl animate-pulse delay-700"></div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </main>
    </div>
  );
}