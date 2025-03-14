import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoLogoGithub } from "react-icons/io";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center px-4 md:px-6 lg:px-8">
      <h1 className="mb-8 font-manrope pt-24 font-semibold text-7xl tracking-tight max-w-2xl text-center mx-auto">
        Generate a Changelog using AI
      </h1>
      <div className="mt-8 relative flex mx-auto max-w-xl w-full">
        <IoLogoGithub className="absolute left-3 w-6 h-6 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="relative !p-6 !ps-12 placeholder:text-lg !text-lg rounded-tr-none rounded-br-none"
          placeholder="Enter a public repo URL"
        />
        <Button className="bg-blue-600 hover:bg-blue-800 cursor-pointer !min-h-full text-lg py-6 rounded-tl-none rounded-bl-none">
          Generate
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <div className="w-48 h-[1px] bg-border" />
        <p>Or</p>
        <div className="w-48 h-[1px] bg-border" />
      </div>
      <div className="relative max-w-xl w-full sm:w-fit">
        <Link href="/generate">
          <Button className="relative text-lg p-6 !pe-6 gap-3 cursor-pointer w-full lg:w-fit">
            <IoLogoGithub className="!w-6 !h-6 text-background" />
            Sign In with Github
          </Button>
        </Link>
      </div>
    </div>
  );
}
