import NextLink from "next/link";
import type { FC } from "react";

import { Button } from "../ui/button";
import { Card, CardContent, CardHeader,CardTitle } from "../ui/card";

export interface PartnerBannerProps {
  href: string;
}

export const LearnWeb3Banner: FC<PartnerBannerProps> = ({ href }) => {
  return (
    <Card className="banner flex-col lg:flex-row-reverse">
      <div>
        <CardHeader className="flex-row justify-center">
          <CardTitle className="title">LEARN WEB3</CardTitle>
        </CardHeader>
        <CardContent className="description">
          <p>
            DeveloperDAO Academy offers learning resources to help you learn how to build web3
            technologies.
          </p>
        </CardContent>
        <CardContent className=" flex justify-center">
          <Button asChild className="button-rounded bg-[#44AF96] text-black">
            <NextLink href={href}>get started</NextLink>
          </Button>
        </CardContent>
      </div>
      <div className="ml-0 lg:ml-auto">
        <CardContent className="terminal-text">
          <div className="line">
            <div>
              <span>1</span>
            </div>
            <div className="text-white">
              <p>
                <span className="text-[#F97583]">
                  function&nbsp;
                  <span className="text-[#e65a9e]">
                    <span className="agency-solid">submitVote</span>
                  </span>
                </span>
                (
              </p>
              <p>
                <span className="text-[#FF39F7]">
                  uint256&nbsp;
                  <span className="text-[#e65a9e]">
                    <span className="agency-solid">proposalIndex</span>
                  </span>
                </span>
                ,
              </p>
              <p>
                <span className="text-[#FF39F7]">
                  uint8&nbsp;
                  <span className="text-[#e65a9e]">
                    <span className="agency-solid">uintVote</span>
                  </span>
                </span>
              </p>
            </div>
          </div>
          <div className="line">
            <div>
              <span>2</span>
            </div>
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
            <div>
              <span>3</span>
            </div>
            <div>
              <p className="pl-6">
                <span className="text-[#FF39F7]">
                  address&nbsp;
                  <span className="text-[#e65a9e]">
                    <span className="agency-solid">memberAddress</span> =
                  </span>
                </span>
              </p>
              <p className="pl-12 text-white">
                memberAddress[<span className="text-[#79B8FF]">msg</span>.sender];
              </p>
            </div>
          </div>
          <div className="line">
            <div>
              <span>4</span>
            </div>
            <div className="text-white">
              <p className="pl-6">
                <span className="text-[#FF39F7]">
                  Member&nbsp;
                  <span className="text-[#F97583]">
                    storage&nbsp;
                    <span className="text-[#e65a9e]">
                      <span className="agency-solid">member&nbsp;</span>
                    </span>
                  </span>
                </span>
                = members[memberAddress];
              </p>
            </div>
          </div>
          <div className="line">
            <div>
              <span>5</span>
            </div>
            <div className="text-white">
              <p className="pl-6">
                <span className="text-[#F97583]">require</span>
                (proposalIndex&nbsp;<span className="text-[#F97583]">&lt;&nbsp;</span>
                proposalQueue.length,
              </p>
              <p className="pl-12">
                <span className="text-[#9ECBFF]">&quot;proposal does not exist&quot;</span>);
              </p>
            </div>
          </div>
          <div className="line">
            <div>
              <span>6</span>
            </div>
            <div>
              <p className="pl-6">
                <span className="text-[#FF39F7]">
                  Proposal&nbsp;
                  <span className="text-[#F97583]">
                    storage&nbsp;
                    <span className="text-[#e65a9e]">
                      <span className="agency-solid">proposal&nbsp;</span>
                    </span>
                  </span>
                </span>
                =
              </p>
              <p className="pl-12 text-white">proposals[proposalQueue[proposalIndex]];</p>
            </div>
          </div>
          <div className="line">
            <div>
              <span>7</span>
            </div>
            <div className="text-white">
              <p className="pl-6">
                <span className="text-[#F97583]">require</span>
                (uintVote&nbsp;<span className="text-[#F97583]">&lt;&nbsp;</span>
                <span className="text-[#9ECBFF]">3, &quot;must be less than 3&quot;</span>);
              </p>
            </div>
          </div>
          <div className="line">
            <div>
              <span>8</span>
            </div>
            <div>
              <p className="pl-6 text-white">
                <span className="text-[#FF39F7]">
                  Vote&nbsp;
                  <span className="text-[#e65a9e]">
                    <span className="agency-solid">vote</span> =&nbsp;
                  </span>
                </span>
                <span className="text-[#B392F0]">Vote</span>(uintVote);
              </p>
              <p className="pl-3 text-white">...</p>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default LearnWeb3Banner;
