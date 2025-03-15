import Navbar from "@/components/unauthed-navbar";
import { createClient } from "@/utils/supabase/server";
import { ReactNode } from "react";

export default async function UnauthedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      <div className="flex flex-1">{children}</div>
    </div>
  );
}
