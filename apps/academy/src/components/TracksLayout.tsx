"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import type { FunctionComponent, PropsWithChildren } from "react";
import { Fragment, useEffect,useState } from "react";
import { Icons } from "ui/components/Icons";

import { ConnectButton } from "@/components/ConnectButton";
import { sampleMenus,TracksHeader } from "@/components/TracksHeader";

export const TracksLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted) {
    return (
      <div>
        <Transition
          show={open}
          as={Fragment}
          enter="transition ease-in-out duration-500 transform"
          enterFrom="-translate-x-full transition transform duration-500 ease-in-out"
          enterTo="translate-x-0 transition transform duration-500 ease-in-out"
          leave="transition ease-in-out duration-500 transform"
          leaveFrom="translate-x-0 transition transform duration-500 ease-in-out"
          leaveTo="-translate-x-full transition transform duration-500 ease-in-out"
        >
          <Dialog
            as="div"
            className="fixed inset-y-0 left-0 z-50 w-64 space-y-5 bg-black px-5 py-10 md:hidden"
            onClose={setOpen}
          >
            <ConnectButton />
            <div className="h-full w-full">
              {sampleMenus.map((menu, index) => {
                const Icon = menu.icon !== undefined ? Icons[menu.icon] : null;
                return (
                  <Link href={menu.href} key={index}>
                    <div className="flex w-full items-center space-x-2.5 rounded-sm p-2.5 text-white hover:cursor-pointer hover:bg-[#44AF96]">
                      <div>{Icon ? <Icon /> : null}</div>
                      <p>{menu.name}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Dialog>
        </Transition>
        <div className="absolute inset-x-0 top-0">
          <TracksHeader openMenu={open} setOpenMenu={setOpen} />
        </div>
        <main>{children}</main>
      </div>
    );
  } else {
    return <></>;
  }
};
