import Navbar from "@/components/unauthed-navbar";
import { ReactNode } from "react";

export default function UnauthedLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
