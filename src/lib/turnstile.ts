export async function verifyTurnstileToken(token: string): Promise<boolean> {
  if (!token) return false;

  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.warn("Cloudflare Turnstile secret key is not set. Skipping verification.");
    return true; // Don't block developers if not configured yet
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await res.json();
    return !!data.success;
  } catch (err) {
    console.error("Turnstile server verification failed:", err);
    return false;
  }
}
