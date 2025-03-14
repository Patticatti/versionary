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
    <>
      <Navbar user={user} />
      <div className="pt-14 min-h-screen">{children}</div>
    </>
  );
}
