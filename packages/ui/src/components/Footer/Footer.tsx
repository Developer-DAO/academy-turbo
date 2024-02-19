import Image from "next/image";
import Link from "next/link";

import { Icons } from "../Icons";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface SocialLinks {
  alt?: string;
  href: string;
  icon: string;
  tooltipText: string;
}

interface FooterLinks {
  name: string;
  href: string;
  tooltipText: string;
}

const links: readonly FooterLinks[] = [
  { name: "DAO", href: "https://developerdao.com", tooltipText: "Developer DAO website" },
  {
    name: "Feedback",
    href: "https://github.com/Developer-DAO/academy-turbo/issues/new/choose",
    tooltipText: "Send us feedback, create an issue!",
  },
  {
    name: "Newsletter",
    href: "https://developerdao.substack.com/",
    tooltipText: "Developer DAO Substack",
  },
];

const socials: readonly SocialLinks[] = [
  {
    alt: "Github",
    href: "https://github.com/Developer-DAO/academy-turbo",
    icon: "github_circle",
    tooltipText: "D_D Academy Github Repository",
  },
  {
    alt: "Twitter",
    href: "https://x.com/devdao_academy",
    icon: "twitter_circle",
    tooltipText: "D_D Academy on x.com",
  },
  {
    alt: "D_D Blog",
    href: "https://blog.developerdao.com",
    icon: "mirror_circle",
    tooltipText: "Developer DAO Blog",
  },
];

export const Footer = () => {
  return (
    <footer className="main-container">
      <div className="footer">
        <nav aria-label="social" className="px-4">
          {socials.map((social) => {
            const Icon = Icons[social.icon];
            return (
              <TooltipProvider delayDuration={30} key={social.href}>
                <Tooltip>
                  <TooltipTrigger>
                    <a aria-label={social.alt} href={social.href} className="group" target="_blank">
                      {Icon ? <Icon className="h-16 w-16 md:h-20 md:w-20" /> : null}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{social.tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </nav>
        <nav aria-label="quick links" className="h-20 divide-x">
          {links.map((link) => (
            <TooltipProvider delayDuration={30} key={link.href}>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    href={link.href}
                    className="group inline-flex h-full items-center pl-4 md:pl-6"
                    target="_blank"
                  >
                    {link.name}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
        <div className="flex-col gap-y-6 md:flex-row">
          <TooltipProvider delayDuration={30}>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://www.developerdao.com/"
                  target="_blank"
                  className="flex border-b border-r-0 md:border-b-0 md:border-r"
                >
                  <div className="m-auto">
                    <Image
                      src={"/dd_logo_dark.png"}
                      alt={"Developer DAO"}
                      width={200}
                      height={80}
                      className="mb-4 h-20 w-32 p-4 md:mb-0"
                    />
                  </div>
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Developer DAO Website</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="ml-6 max-w-[346px] flex-col justify-center text-start">
            <p>Developer DAO Foundation © 2023</p>
            <p>
              Website content licensed under&nbsp;
              <Link href="https://creativecommons.org/licenses/by-nc/4.0/" className="underline">
                CC BY-NC 4.0.
              </Link>
            </p>
            <p>
              Website code is licensed under&nbsp;
              <Link
                href="https://github.com/Developer-DAO/academy-turbo/blob/main/LICENSE"
                className="underline"
              >
                MIT.
              </Link>
            </p>
            <p>
              <Link href="https://www.developerdao.com/privacy-policy" className="underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="mb-[33px] hidden lg:block">
        <Image src={"/vercel_badge.png"} alt={"powered by vercel"} width={200} height={80} />
      </div>
    </footer>
  );
};
