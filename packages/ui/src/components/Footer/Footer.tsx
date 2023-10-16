import Link from "next/link";
import type { FunctionComponent } from "react";

import { Icons } from "../Icons";

export interface SocialLinks {
  alt?: string;
  href: string;
  icon: string;
}

export interface FooterLinks {
  name: string;
  href: string;
}

export interface FooterProps {
  links: readonly FooterLinks[];
  socials: readonly SocialLinks[];
}

export const Footer: FunctionComponent<FooterProps> = ({ links, socials }) => {
  return (
    <footer>
      <div className="footer">
        <nav aria-label="social">
          {socials.map((social) => {
            const Icon = Icons[social.icon];
            return (
              <Link aria-label={social.alt} href={social.href} className="group" key={social.href}>
                {Icon ? <Icon /> : null}
              </Link>
            );
          })}
        </nav>
        <nav aria-label="quick links" className="divide-x">
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
        <div className="divide-x">
          <Icons.dd_logo className="h-32 w-40" />
          <p className="max-w-xs pl-6 text-start">
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
