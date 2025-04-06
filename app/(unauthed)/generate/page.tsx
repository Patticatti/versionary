import GeneratePage from "./import-component";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

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
