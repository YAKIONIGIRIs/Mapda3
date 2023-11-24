"use client";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import {
  ConnectWallet,
  useAddress,
  useClaimedNFTs,
  useNFT,
  useNFTs,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useContract } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();
  const router = useRouter();

  // React.useEffect(() => {
  //   if (address) {
  //     router.push("/welcome");
  //   }
  // }, [address]);
  const { contract } = useContract(
    "0x9Ec728b16cC14463A0FCA838896E2fEB69265bec"
    // "0x3F04C53C53961AAbF7B9C9797Ad295e74Cb08A14", // test nft drop
    // "nft-drop"
  );
  console.log(contract);
  const {
    data: nft,
    isLoading,
    error,
  } = useOwnedNFTs(contract, "0x7F732854360e47159BeEbcc15b4ad45E9846a1f3");
  const { data: nft2 } = useNFTs(contract);
  // const { data: nft2 } = useNFT(contract, 0);
  // const { data: nft } = useClaimedNFTs(contract);
  console.log(nft);
  console.log(nft2);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Welcome to&nbsp;</h1>
        <h1 className={title({ color: "blue" })}>Mapda3&nbsp;</h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Next generation map on Web3
        </h2>
      </div>
      <Button
        color="primary"
        variant="shadow"
        radius="full"
        href="/home"
        size="lg"
        as={NextLink}
      >
        開始
      </Button>
      <ConnectWallet theme={"light"} modalSize={"wide"} />
    </section>
  );
}
