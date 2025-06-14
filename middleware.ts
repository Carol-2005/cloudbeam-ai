import { clerkMiddleware,createRouteMatcher } from '@clerk/nextjs/server';
//the document available on clark for middleware.ts will protect all the pages but we want customization
import { NextResponse } from 'next/server';
//isPublic(req) will return true if path matches 
const isPublicRoute=createRouteMatcher([
    '/sign-up',
    '/sign-in',
    '/',
    '/home'
])

const isPublicApiRoute=createRouteMatcher([
    '/api/video'
])
//clerk middleware is used to have custome made redirections
export default clerkMiddleware(async(auth,req)=>{
   const {userId}=await auth();
   //req.url---https://localhost:3000/home
   const currentUrl=new URL(req.url);
   const isHomePage=currentUrl.pathname==='/home';
   const isApiRequest=currentUrl.pathname.startsWith('/api');

   if(userId  && isPublicRoute(req) && !isHomePage){
    return NextResponse.redirect(new URL('/home',req.url))
   }
   //if not logged in
   if(!userId){
    if(!isPublicApiRoute(req) && !isPublicRoute(req)){
        return NextResponse.redirect(new URL('/sign-in',req.url));
        //this will craete new url using the current request base url
    }
        if(isApiRequest && !isPublicApiRoute(req)){
            return NextResponse.redirect(new URL('/sign-in',req.url));
        }
    
   }
   return NextResponse.next()
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};