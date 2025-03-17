import Navbar from "@/components/unauthed-navbar";
import { ReactNode } from "react";

export default async function UnauthedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 justify-center">{children}</div>
    </div>
  );
}
