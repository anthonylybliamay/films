import { NextRequest, NextResponse } from "next/server";

// Routes publiques (pas de redirection requise)
const publicRoutes = ["/login", "/signin", "/forgot-password", "/"];

// Routes protégées (redirection vers login si non authentifié)
const protectedRoutes = ["/films", "/films/[id]"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifier si la route est publique
  const isPublicRoute = publicRoutes.includes(pathname);

  // Vérifier si l'utilisateur est authentifié
  const authToken = request.cookies.get("authToken")?.value;

  // Si l'utilisateur est authentifié et essaie d'accéder à login/signin, le rediriger vers /
  if (authToken && (pathname === "/login" || pathname === "/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée
  if (!authToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
