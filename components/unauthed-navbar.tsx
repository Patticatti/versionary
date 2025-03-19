"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { signInWithGitHub } from "@/utils/supabase/actions";
import { useZustandStore } from "@/state/zustandStore";
export default function Navbar() {
  const { user } = useZustandStore();
  return (
    <nav className="sticky top-0 z-50 flex justify-center bg-background">
      <div className="py-2 px-6 md:px-8 lg:px-12 flex justify-between max-w-screen-xl w-full">
        <Link href="/" className="flex items-center">
          <p className="font-manrope tracking-tight text-lg font-bold h-fit">
            Versionary
          </p>
        </Link>
        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <p>Welcome, {user.user_metadata.name}</p>
            <Image
              src={user.user_metadata.avatar_url || "/sponebob.webp"}
              width={20}
              height={20}
              className="rounded-full w-5 h-5"
              alt="Avatar"
            />
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>

            {/* <form action="/auth/signout" method="post">
              <Button type="submit">Log out</Button>
            </form> */}
          </div>
        ) : (
          <div className="flex gap-2">
            <Button onClick={signInWithGitHub}>Get started</Button>
          </div>
        )}
      </div>
    </nav>
  );
}
