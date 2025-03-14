import { getUserProfile } from "@/app/actions/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";
import { signInWithGitHub } from "@/app/actions/auth";
export default async function Navbar() {
  const user = await getUserProfile();
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
            <li>Welcome, {user.email}</li> {/* Display user email */}
            {/* You can also display other profile details */}
            <li>
              <button>Logout</button>
            </li>{" "}
            {/* You can implement logout here */}
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
