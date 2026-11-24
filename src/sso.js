// IAM for the demo ERP.
// sapthamai.com signs a short-lived "access pass" (ES256 JWT) after a visitor
// signs in with Google and books a demo. We verify it here with the PUBLIC key
// (safe to ship in the browser). The pass decides which role the visitor gets.

// Public half of the key pair. The private half lives only on sapthamai.com.
const PUBLIC_JWK = {"kty":"EC","crv":"P-256","x":"1VKKZqnxW27SU6WG9DVctPLlIenK1WIMox8NoQARWEU","y":"ZJnZsAsKnzZkRhok1LYep1T8aEwVVS6amBLCbVuPYQg"};

const AUDIENCE = "saptham-pu-college-erp";
const STORE_KEY = "saptham_sso_token";

export const BOOK_DEMO_URL = "https://sapthamai.com/#contact";

// Roles allowed to preview other roles (like an admin "view as" feature).
export const PREVIEW_ROLES = ["Admin", "Principal"];

// Set VITE_REQUIRE_SSO=false to open the ERP without a pass (local dev / tests).
export const SSO_REQUIRED = import.meta.env.VITE_REQUIRE_SSO !== "false";

function b64urlToBytes(s) {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=");
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

async function verify(token, validRoles) {
  try {
    const [h, p, s] = token.split(".");
    if (!h || !p || !s) return null;
    const header = JSON.parse(new TextDecoder().decode(b64urlToBytes(h)));
    if (header.alg !== "ES256") return null;
    const key = await crypto.subtle.importKey("jwk", PUBLIC_JWK, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
    const ok = await crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, key, b64urlToBytes(s), new TextEncoder().encode(h + "." + p));
    if (!ok) return null;
    const claims = JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));
    if (claims.aud !== AUDIENCE) return null;
    if (!claims.exp || claims.exp * 1000 < Date.now()) return null;
    if (!validRoles.includes(claims.role)) return null;
    return claims;
  } catch {
    return null;
  }
}

// Reads the pass from the URL (#sso=...) or this tab's session. Returns claims or null.
export async function loadIdentity(validRoles) {
  const match = window.location.hash.match(/sso=([^&]+)/);
  if (match) {
    // Remove the pass from the address bar right away.
    history.replaceState(null, "", window.location.pathname + window.location.search);
    const claims = await verify(match[1], validRoles);
    if (claims) {
      try { sessionStorage.setItem(STORE_KEY, match[1]); } catch { /* ignore */ }
      return claims;
    }
  }
  let saved = null;
  try { saved = sessionStorage.getItem(STORE_KEY); } catch { /* ignore */ }
  if (saved) {
    const claims = await verify(saved, validRoles);
    if (claims) return claims;
    try { sessionStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
  }
  return null;
}

export function signOut() {
  try { sessionStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
  window.location.href = BOOK_DEMO_URL;
}
