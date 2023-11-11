import Link from "next/link";

import { Icons } from "../Icons";

interface SocialLinks {
  alt?: string;
  href: string;
  icon: string;
}

interface FooterLinks {
  name: string;
  href: string;
}

const links: readonly FooterLinks[] = [
  { name: "Academy", href: "https://academy.developerdao.com" },
  { name: "Feedback", href: "#Feedbacks" },
  { name: "Newsletter", href: "#Newsletter" },
];

const socials: readonly SocialLinks[] = [
  { alt: "Github", href: "https://github.com/Developer-DAO", icon: "github_circle" },
  { alt: "Twitter", href: "https://x.com/devdao_academy", icon: "twitter_circle" },
  { alt: "Mirror", href: "#mirror.xyz", icon: "mirror_circle" },
];

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center pt-12">
      <div className="footer main-container">
        <nav aria-label="social">
          {socials.map((social) => {
            const Icon = Icons[social.icon];
            return (
              <Link
                aria-label={social.alt}
                href={social.href}
                className="group mt-16"
                key={social.href}
              >
                {Icon ? <Icon /> : null}
              </Link>
            );
          })}
        </nav>
        <nav aria-label="quick links" className="mt-16 divide-x">
          {links.map((link) => (
            <Link
              href={link.href}
              className="group inline-flex h-full items-center pl-6"
              key={link.href}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col items-center px-5 pb-20 pt-6">
          <Icons.dd_logo className="h-32 w-40 shrink-0" />
          <hr className="-mr-5 mt-2.5 min-h-[1px] w-full self-stretch bg-white" />
          <p className="-mr-5 mt-2.5 max-w-xs ">
            Developer DAO Foundation © 2023 Website content licensed under&emsp;
            <Link href="https://creativecommons.org/licenses/by-nc/4.0/" className="underline">
              CC BY-NC 4.0
            </Link>
            . Website code is licensed under&emsp;
            <Link
              href="https://github.com/Developer-DAO/academy/blob/main/LICENSE"
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
