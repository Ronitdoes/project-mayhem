import { cookies } from "next/headers";
import { verifyCookie } from "@/lib/auth-session";
import SlideScroller from "@/components/SlideScroller";
import LandingAuthClient from "@/components/LandingAuthClient";

export default async function Home() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("auth_session")?.value;
  const userId = authCookie ? verifyCookie(authCookie) : null;
  const authenticated = Boolean(userId);

  return (
    <main className="relative min-h-screen w-full bg-[#050508]">
      {authenticated ? <SlideScroller /> : <LandingAuthClient />}
    </main>
  );
}
