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
  { name: "Academy", href: "https://academy.developerdao.com", tooltipText: "D_D Academy website" },
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
                      {Icon ? <Icon /> : null}
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
        <div className="flex flex-col gap-y-6 divide-x-0 divide-y md:flex-row md:divide-x md:divide-y-0">
          <TooltipProvider delayDuration={30}>
            <Tooltip>
              <TooltipTrigger>
                <a href="https://www.developerdao.com/" about="_blank">
                  <Icons.dd_logo className="h-32 w-40" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Developer DAO Website</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className="max-w-xs py-6 pl-6 text-start md:py-0">
            Developer DAO Foundation © 2023 Website content licensed under&emsp;
            <Link href="https://creativecommons.org/licenses/by-nc/4.0/" className="underline">
              CC BY-NC 4.0
            </Link>
            . Website code is licensed under&emsp;
            <Link
              href="https://github.com/Developer-DAO/academy-turbo/blob/main/LICENSE"
              className="underline"
            >
              MIT
            </Link>
            .&emsp;
            <Link href="https://www.developerdao.com/privacy-policy" className="underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};
