import { next } from "@vercel/functions";

function notFound() {
  return new Response("Not Found", { status: 404 });
}

export const config = {
  matcher: ["/:path*"],
};

export default async function middleware(request) {
  // すでに通行許可CookieがあればOK
  const cookie = request.headers.get("cookie") || "";
  if (cookie.includes("app_ok=1")) {
    return next();
  }

  // HTMLドキュメントの時だけ検査（画像/CSS/JS等は通す）
  const secFetchDest = request.headers.get("sec-fetch-dest") || "";
  const accept = request.headers.get("accept") || "";
  const isDocument =
    secFetchDest === "document" || accept.includes("text/html");

  if (!isDocument) {
    return next();
  }

  // ---- ヘッダーチェック ----
  const h = request.headers;
  const xMyApp = h.get("X-Amber-Palette-App");
  const xAppVersion = h.get("X-App-Version");
  const ua = h.get("User-Agent") || "";

  const ok =
    xMyApp === "true" &&
    xAppVersion === "1.0.0" &&
    ua.includes("AmberPalette/1.0.0");

  if (!ok) return notFound();

  // OKなら Cookie を付けて続行
  const res = await next();

  // Cookieを新しいResponseで付与（Vercel Middlewareの正しい書き方）
  const newHeaders = new Headers(res.headers);
  newHeaders.append(
    "set-cookie",
    "app_ok=1; Path=/; Max-Age=2592000; SameSite=Lax; Secure"
  );

  return new Response(res.body, {
    status: res.status,
    headers: newHeaders,
  });
}
