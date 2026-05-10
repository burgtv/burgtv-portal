// Vercel Edge Middleware (works for static sites too — no Next.js required).
// Rewrites every request hitting `admin.burgtv.com` to the /admin/ folder so
// the subdomain serves the admin panel as if it were its own root.
//
// We intentionally do NOT touch responses on `app.burgtv.com` — they keep
// serving the regular customer-facing site.

export const config = {
  // Skip Vercel internals + static assets that we don't want to rewrite.
  matcher: ['/((?!_next/|_vercel|favicon\\.ico|robots\\.txt|sitemap\\.xml|assets/|logo\\.png).*)'],
};

export default function middleware(req) {
  const host = req.headers.get('host') || '';
  if (host !== 'admin.burgtv.com') return;

  const url = new URL(req.url);
  // If the request is already targeting /admin/* there's nothing to do.
  if (url.pathname.startsWith('/admin')) return;

  // Build the rewritten URL pointing into /admin/.
  const target = new URL(req.url);
  target.pathname = '/admin' + (url.pathname === '/' ? '/' : url.pathname);

  return Response.redirect(target, 307);
}
