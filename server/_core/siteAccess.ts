import crypto from "crypto";
import type { Express, Request, Response } from "express";

const COOKIE_NAME = "tt_site_access";
const TOKEN_CONTEXT = "treethousands-site-access-v1";

function expectedToken(password: string): string {
  return crypto.createHmac("sha256", password).update(TOKEN_CONTEXT).digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function readCookie(req: Request, name: string): string {
  const cookieHeader = req.headers.cookie ?? "";
  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator < 0) continue;
    if (part.slice(0, separator).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch {
      return "";
    }
  }
  return "";
}

function loginPage(hasError = false): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="robots" content="noindex,nofollow" />
  <title>TreeThousands — Private Preview</title>
  <style>
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f5f3ef;color:#111;font-family:Arial,Helvetica,sans-serif;padding:24px}.gate{width:min(440px,100%);text-align:center}.brand{font-family:'Arial Narrow',Impact,sans-serif;font-size:42px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 12px}.eyebrow{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#777;margin:0 0 42px}.copy{font-size:15px;line-height:1.6;color:#52575c;margin:0 0 24px}.field{width:100%;height:50px;border:1px solid #bbb;background:#fff;border-radius:3px;padding:0 16px;font-size:16px;outline:none}.field:focus{border-color:#111}.button{width:100%;height:50px;margin-top:14px;background:#111;color:#fff;border:2px solid #111;border-radius:3px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:.2s}.button:hover{background:#f5f3ef;color:#111}.error{font-size:13px;color:#a32323;margin:14px 0 0}
  </style>
</head>
<body>
  <main class="gate">
    <h1 class="brand">TreeThousands</h1>
    <p class="eyebrow">Private Preview</p>
    <p class="copy">This website is currently in testing. Enter the access password to continue.</p>
    <form method="post" action="/site-access">
      <input class="field" type="password" name="password" placeholder="Access password" autocomplete="current-password" autofocus required />
      <button class="button" type="submit">Enter Website</button>
      ${hasError ? '<p class="error" role="alert">Incorrect password. Please try again.</p>' : ""}
    </form>
  </main>
</body>
</html>`;
}

export function registerSiteAccessGate(app: Express): void {
  const password = process.env.SITE_ACCESS_PASSWORD?.trim();
  if (!password) {
    console.warn("[SiteAccess] SITE_ACCESS_PASSWORD is not configured; preview gate is disabled.");
    return;
  }

  const token = expectedToken(password);
  const isAuthorized = (req: Request) => safeEqual(readCookie(req, COOKIE_NAME), token);

  app.get("/site-access", (req, res) => {
    if (isAuthorized(req)) return res.redirect(302, "/");
    res.set("Cache-Control", "no-store");
    res.set("X-Robots-Tag", "noindex, nofollow");
    return res.status(200).type("html").send(loginPage());
  });

  app.post("/site-access", (req: Request, res: Response) => {
    const submitted = typeof req.body?.password === "string" ? req.body.password : "";
    if (!safeEqual(submitted, password)) {
      res.set("Cache-Control", "no-store");
      res.set("X-Robots-Tag", "noindex, nofollow");
      return res.status(401).type("html").send(loginPage(true));
    }

    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    res.setHeader("Set-Cookie", `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${secure}`);
    return res.redirect(303, "/");
  });

  app.use((req, res, next) => {
    if (isAuthorized(req)) return next();
    res.set("Cache-Control", "no-store");
    res.set("X-Robots-Tag", "noindex, nofollow");
    if (req.path.startsWith("/api/") || req.path.startsWith("/uploads/")) {
      return res.status(401).json({ error: "Site access required" });
    }
    return res.redirect(302, "/site-access");
  });
}
