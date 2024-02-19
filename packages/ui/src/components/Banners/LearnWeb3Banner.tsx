import NextLink from "next/link";
import type { FC } from "react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export interface HomePageBannerProps {
  href: string;
}

export const LearnWeb3Banner: FC<HomePageBannerProps> = ({ href }) => {
  return (
    <Card className="banner flex-col lg:flex-row">
      <div className="terminal-text">
        <div className="line">
          <div>1</div>
          <div className="text-white">
            <p>
              <span className="text-[#F97583]">function submitVote</span>(
            </p>
            <p>
              <span className="text-[#FF39F7]">
                uint256 <span className="text-[#e65a9e]">proposalIndex</span>{" "}
              </span>
              ,
            </p>
            <p>
              <span className="text-[#FF39F7]">
                uint8 <span className="text-[#e65a9e]">uintVote</span>
              </span>
            </p>
          </div>
        </div>
        <div className="line">
          <div>2</div>
          <div className="text-white">
            <p>
              )
              <span className="text-[#F97583]">
                public <span className="text-[#BE2D61]">nonReentrant onlyDelegate</span>
              </span>
              &#123;
            </p>
          </div>
        </div>
        <div className="line">
          <div>3</div>
          <div className="text-white">
            <p className="pl-6">
              <span className="text-[#FF39F7]">address&nbsp;</span>
              <span className="text-[#e65a9e]">member Address</span> =
            </p>
            <p className="pl-12">
              memberAddress[<span className="text-[#79B8FF]">msg</span>.sender];
            </p>
          </div>
        </div>
        <div className="line">
          <div>4</div>
          <div>
            <p className="pl-6 text-white md:whitespace-nowrap">
              <span className="text-[#FF39F7]">Member&nbsp;</span>
              <span className="text-[#e65a9e]">storage member</span> = members[memberAddress];
            </p>
          </div>
        </div>
        <div className="line">
          <div>5</div>
          <div className="text-white">
            <p className="pl-6">
              <span className="text-[#F97583]">require</span>
              (proposalIndex <span className="text-[#F97583]">&lt;&nbsp;</span>
              proposalQueue.length,
            </p>
            <p className="pl-12">
              <span className="text-[#9ECBFF]">&quot;proposal does not exist&quot;</span>);
            </p>
          </div>
        </div>
        <div className="line">
          <div>6</div>
          <div className="text-white">
            <p className="pl-6">
              <span className="text-[#FF39F7]">Proposal&nbsp;</span>
              <span className="text-[#e65a9e]">storage proposal</span> =
            </p>
            <p className="pl-12">proposals&#91;proposalQueue&#91; proposalIndex &#93;&#93;;</p>
          </div>
        </div>
        <div className="line">
          <div>7</div>
          <div className="text-white md:whitespace-nowrap">
            <p className="pl-6">
              <span className="text-[#F97583]">require</span>
              (uintVote&nbsp;<span className="text-[#F97583]">&lt;&nbsp;</span>
              <span className="text-[#9ECBFF]">3, &quot;must be less than 3&quot;</span>);
            </p>
          </div>
        </div>
        <div className="line">
          <div>8</div>
          <div>
            <p className="pl-6 text-white">
              <span className="text-[#FF39F7]">Vote&nbsp;</span>
              <span className="text-[#e65a9e]">vote</span> =&nbsp;
              <span className="text-[#B392F0]">Vote</span>(uintVote);
            </p>
            <p className="pl-3 text-white">...</p>
          </div>
        </div>
      </div>
      <div className="pb-8">
        <CardHeader className="flex-row justify-center">
          <CardTitle className="title">LEARN WEB3</CardTitle>
        </CardHeader>
        <CardContent className="description max-w-[552px] p-1 pb-12 md:pb-1">
          <p>Developer DAO offers learning resources to help you build with web3 technologies.</p>
        </CardContent>
        <div className="flex justify-center">
          <Button asChild className="button-rounded text-black hover:bg-[#721F79] hover:text-white">
            <NextLink href={href}>get started!</NextLink>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default LearnWeb3Banner;
