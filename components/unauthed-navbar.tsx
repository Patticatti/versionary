import Link from "next/link";
import { Button } from "./ui/button";
import { signInWithGitHub, signOut } from "@/utils/supabase/actions";
import { User } from "@supabase/supabase-js";
export default async function Navbar({ user }: { user: User | null }) {
  return (
    <nav className="fixed w-full top-0 flex justify-center bg-background">
      <div className="py-3 px-6 md:px-8 lg:px-12 flex justify-between max-w-screen-xl w-full">
        <Link href="/" className="flex items-center">
          <p className="font-manrope tracking-tight text-xl font-bold h-fit">
            Versionary
          </p>
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <p>Welcome, {user.user_metadata.name}</p>
            <Button onClick={signOut}>Log out</Button>
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
