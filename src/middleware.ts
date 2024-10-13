import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/signup(.*)",
  "/reset-password(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const origin = req.nextUrl.origin;
  const pathname = req.nextUrl.pathname;

  if (!isPublicRoute(req)) {
    const user = auth().userId;

    if (user && pathname === "/") {
      return Response.redirect(`${origin}/products`);
    }

    auth().protect({
      unauthenticatedUrl: `${origin}/login`,
      unauthorizedUrl: `${origin}`,
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
