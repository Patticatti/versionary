import { signInWithGitHub } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { IoLogoGithub } from "react-icons/io";
export default function LoginButton() {
  return (
    <form action={signInWithGitHub}>
      <Button
        type="submit"
        className="relative text-lg p-6 !pe-6 gap-3 cursor-pointer w-full lg:w-fit"
      >
        <IoLogoGithub className="!w-6 !h-6 text-background" />
        Sign In with Github
      </Button>
    </form>
  );
}
