import GeneratePage from "./generate";
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
    <div className="flex flex-1 bg-accent">
      <GeneratePage user={user} />
    </div>
  );
}
