import Link from "next/link";
import { Button } from "./ui/button";
import { signInWithGitHub, signOut } from "@/app/actions/auth";
import { User } from "@supabase/supabase-js";
export default async function Navbar({ user }: { user: User | null }) {
  console.log(user);
  return (
    <nav className="sticky top-0 flex justify-center">
      <div className="py-4 px-6 md:px-8 lg:px-12 flex justify-between max-w-screen-xl w-full">
        <Link href="/">
          <p className="font-manrope tracking-tight text-xl font-bold">
            Log.it
          </p>
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <p>Welcome, {user.user_metadata.name}</p>
            <Button onClick={signOut}>Log out</Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost">Sign in</Button>
            <Button onClick={signInWithGitHub}>Get started</Button>
          </div>
        )}
      </div>
    </nav>
  );
}
