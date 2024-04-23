import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import type { NextPageWithLayout } from "@/pages/_app";

const Home: NextPageWithLayout = () => {
  const { address } = useAccount();
  const { status } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (address !== undefined && status === "authenticated") {
      if (
        address === "0x4475FD456140b28944e322e8CC4B1740f161c7dA" ||
        address === "0xEe94137fE98D3fa740e144dB3A329737eb889356"
      ) {
        void router.push("/tracks");
      }
    }
  }, [address, status]);

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden h-full flex-col p-10  dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Logo
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and helped me deliver
              stunning designs to my clients faster than ever before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Connect your wallet</h1>
            <ConnectButton />
          </div>
          <p className="text-muted-foreground px-8 text-center text-sm">
            By clicking continue, you agree to our{" "}
            <Link href="/terms" className="hover:text-primary underline underline-offset-4">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:text-primary underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
