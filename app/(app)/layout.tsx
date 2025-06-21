// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useClerk, useUser } from "@clerk/nextjs";
// import {
//   LogOutIcon,
//   MenuIcon,
//   LayoutDashboardIcon,
//   Share2Icon,
//   UploadIcon,
//   ImageIcon,
// } from "lucide-react";

// const sidebarItems = [
//   { href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
//   { href: "/social-share", icon: Share2Icon, label: "Social Share" },
//   { href: "/video-uploads", icon: UploadIcon, label: "Video Upload" },
// ];

// export default function AppLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { signOut } = useClerk();
//   const { user } = useUser();

//   const handleLogoClick = () => {
//     router.push("/");
//   };

//   const handleSignOut = async () => {
//     await signOut();
//   };

//   return (
//     <div className="drawer lg:drawer-open">
//       <input
//         id="sidebar-drawer"
//         type="checkbox"
//         className="drawer-toggle"
//         checked={sidebarOpen}
//         onChange={() => setSidebarOpen(!sidebarOpen)}
//       />
//       <div className="drawer-content flex flex-col">
//         {/* Navbar */}
//         <header className="w-full bg-base-200">
//           <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex-none lg:hidden">
//               <label
//                 htmlFor="sidebar-drawer"
//                 className="btn btn-square btn-ghost drawer-button"
//               >
//                 <MenuIcon />
//               </label>
//             </div>
//             <div className="flex-1">
//               <Link href="/" onClick={handleLogoClick}>
//                 <div className="btn btn-ghost normal-case text-2xl font-bold tracking-tight cursor-pointer">
//                   Cloudinary Showcase
//                 </div>
//               </Link>
//             </div>
//             <div className="flex-none flex items-center space-x-4">
//               {user && (
//                 <>
//                   <div className="avatar">
//                     <div className="w-8 h-8 rounded-full">
//                       <img
//                         src={user.imageUrl}
//                         alt={
//                           user.username || user.emailAddresses[0].emailAddress
//                         }
//                       />
//                     </div>
//                   </div>
//                   <span className="text-sm truncate max-w-xs lg:max-w-md">
//                     {user.username || user.emailAddresses[0].emailAddress}
//                   </span>
//                   <button
//                     onClick={handleSignOut}
//                     className="btn btn-ghost btn-circle"
//                   >
//                     <LogOutIcon className="h-6 w-6" />
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </header>
//         {/* Page content */}
//         <main className="flex-grow">
//           <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
//             {children}
//           </div>
//         </main>
//       </div>
//       <div className="drawer-side">
//         <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
//         <aside className="bg-base-200 w-64 h-full flex flex-col">
//           <div className="flex items-center justify-center py-4">
//             <ImageIcon className="w-10 h-10 text-primary" />
//           </div>
//           <ul className="menu p-4 w-full text-base-content flex-grow">
//             {sidebarItems.map((item) => (
//               <li key={item.href} className="mb-2">
//                 <Link
//                   href={item.href}
//                   className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
//                     pathname === item.href
//                       ? "bg-primary text-white"
//                       : "hover:bg-base-300"
//                   }`}
//                   onClick={() => setSidebarOpen(false)}
//                 >
//                   <item.icon className="w-6 h-6" />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//           {user && (
//             <div className="p-4">
//               <button
//                 onClick={handleSignOut}
//                 className="btn btn-outline btn-error w-full"
//               >
//                 <LogOutIcon className="mr-2 h-5 w-5" />
//                 Sign Out
//               </button>
//             </div>
//           )}
//         </aside>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOut,
  Menu,
  LayoutDashboard,
  Share2,
  Upload,
  Image,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboard, label: "Home Page" },
  { href: "/social-share", icon: Share2, label: "Social Share" },
  { href: "/video-uploads", icon: Upload, label: "Video Upload" },
];

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="drawer lg:drawer-open">
        <input
          id="sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={sidebarOpen}
          onChange={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="drawer-content flex flex-col">
          {/* Enhanced Navbar */}
          <header className="w-full bg-gray-900 border-b border-gray-800 backdrop-blur-md">
            <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex-none lg:hidden">
                <label
                  htmlFor="sidebar-drawer"
                  className="btn btn-square btn-ghost drawer-button text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Menu />
                </label>
              </div>
              <div className="flex-1">
                <Link href="/" onClick={handleLogoClick}>
                  <div className="btn btn-ghost normal-case text-2xl font-bold tracking-tight cursor-pointer text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">
                    <Image className="w-8 h-8 mr-2 text-blue-400" />
                    Cloudinary Showcase
                  </div>
                </Link>
              </div>
              <div className="flex-none flex items-center space-x-4">
                {user && (
                  <>
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900">
                        <img
                          src={user.imageUrl}
                          alt={
                            user.username || user.emailAddresses[0].emailAddress
                          }
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <span className="text-sm text-gray-300 truncate max-w-xs lg:max-w-md font-medium">
                      {user.username || user.emailAddresses[0].emailAddress}
                    </span>
                    <button
                      onClick={handleSignOut}
                      className="btn btn-ghost btn-circle text-gray-300 hover:text-white hover:bg-red-500/20 transition-colors duration-200"
                    >
                      <LogOut className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </header>
          
          {/* Page content */}
          <main className="flex-grow bg-gray-950">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
              {children}
            </div>
          </main>
        </div>
        
        <div className="drawer-side">
          <label htmlFor="sidebar-drawer" className="drawer-overlay bg-black/50"></label>
          <aside className="bg-gray-900 w-64 h-full flex flex-col border-r border-gray-800 shadow-xl">
            {/* Enhanced Logo Section */}
            <div className="flex items-center justify-center py-6 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Image className="w-7 h-7 text-white" />
                </div>
                <div className="text-white font-semibold text-lg">
                  Cloudinary
                </div>
              </div>
            </div>
            
            {/* Enhanced Navigation */}
            <ul className="menu p-4 w-full text-gray-300 flex-grow space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      pathname === item.href
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className={`w-6 h-6 ${
                      pathname === item.href 
                        ? "text-white" 
                        : "text-gray-400 group-hover:text-white"
                    }`} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Enhanced Sign Out Section */}
            {user && (
              <div className="p-4 border-t border-gray-800">
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800 mb-3">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring-2 ring-blue-500">
                      <img
                        src={user.imageUrl}
                        alt={user.username || user.emailAddresses[0].emailAddress}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.username || user.firstName || "User"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {user.emailAddresses[0].emailAddress}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="btn w-full bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}