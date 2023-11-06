/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ConnectButton as RainbowkitConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { Button } from "ui/components/ui/button";

export const ConnectButton = () => {
  return (
    <RainbowkitConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        if (!ready) {
          return (
            <Button className="button-rounded" disabled>
              loading
            </Button>
          );
        }

        return (
          <>
            {!connected ? (
              <Button
                onClick={openConnectModal}
                className="button-rounded z-20 hover:bg-[var(--button-secondary-dark)]"
              >
                Connect
              </Button>
            ) : chain.unsupported ? (
              <Button
                onClick={openChainModal}
                className="button-rounded z-20 hover:bg-[var(--button-accent-dark)]"
              >
                Switch Network
              </Button>
            ) : (
              <button onClick={openAccountModal}>
                <Image
                  src={account.ensAvatar !== undefined ? account.ensAvatar : "/DD_NFT_avatar.png"}
                  alt="account avatar"
                  width={50}
                  height={50}
                  className="z-20 rounded-full border-2 border-black p-0 opacity-80 shadow-sm"
                />
              </button>
            )}
          </>
        );
      }}
    </RainbowkitConnectButton.Custom>
  );
};
