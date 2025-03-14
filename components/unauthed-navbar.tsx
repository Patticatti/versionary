import Link from "next/link";
import { Button } from "./ui/button";
import { signInWithGitHub } from "@/app/actions/auth";
import { User } from "@supabase/supabase-js";
export default async function Navbar({ user }: { user: User | null }) {
  return (
    <nav className="sticky top-0 flex justify-center">
      <div className="py-4 px-6 md:px-8 lg:px-12 flex justify-between max-w-screen-xl w-full">
        <Link href="/">
          <p className="font-manrope tracking-tight text-xl font-bold">
            Log.it
          </p>
        </Link>
        {user ? (
          <>
            <li>Welcome, {user.user_metadata.displayName}</li>
            <li>
              <button>Logout</button>
            </li>{" "}
          </>
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
