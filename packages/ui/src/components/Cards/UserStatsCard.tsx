import React from "react";

import { Icons } from "../Icons";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export const UserStatsCard: React.FC = () => {
  return (
    <Card className="profile-card">
      <div className="p-5 pb-10">
        <CardHeader>
          <CardTitle className="text-3xl">Stats</CardTitle>
        </CardHeader>
        <CardContent className="text-xl font-semibold">
          <div className="flex flex-row justify-between">
            <div className="mr-12">
              <div className="flex flex-row items-center py-3">
                <div className="mr-4">
                  <Icons.in_progress />
                </div>
                <h3>In Progress</h3>
              </div>
              <div className="flex flex-row items-center py-3">
                <div className="mr-4">
                  <Icons.checkmark />
                </div>
                <h3>Completed</h3>
              </div>
              <div className="flex flex-row items-center py-3">
                <div className="mr-4">
                  <Icons.nft_mint />
                </div>
                <h3>NFT&apos;s Minted</h3>
              </div>
            </div>
            <div>
              <ul className="text-right">
                <li className="py-3">5</li>
                <li className="py-3">32</li>
                <li className="py-3">21</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
