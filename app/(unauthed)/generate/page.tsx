import GeneratePage from "./generate";
import Navbar from "@/components/unauthed-navbar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/");
  }
  return (
    <>
      <Navbar user={user} />
      <div className="pt-14 min-h-screen">
        <GeneratePage user={user} />
      </div>
    </>
  );
}
