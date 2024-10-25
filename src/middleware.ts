import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// clerkMiddleware is a function that accepts a function that returns a middleware function.
const isPublicRoute = createRouteMatcher([
  "/login(.*)",
  "/singup(.*)",
  "/reset-password(.*)",
]);

export default clerkMiddleware((auth, req) => {
  console.log("Middleware running1", {
    isPublicRoute: isPublicRoute(req),
    url: req.nextUrl.href,
  });
  if (!isPublicRoute(req)) {
    const origin = req.nextUrl.origin;

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
