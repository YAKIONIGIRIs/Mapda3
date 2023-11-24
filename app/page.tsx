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
import Image from "next/image";

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
    <>
      <div className="grid grid-cols-2 gap-4 h-full">
        <div className="flex flex-col justify-center">
          <div className="inline-block justify-center">
            <h1 className={title({ size: "lg" })}>Welcome to&nbsp;</h1>
            <h1 className={title({ color: "blue", size: "lg" })}>
              Mapda3&nbsp;
            </h1>
            <h2 className={subtitle({ class: "mt-6 mb-10" })}>
              走行経路のNFT化 × みんなで作るリアルタイムストリートビュー
            </h2>
          </div>
          <div>
            <ConnectWallet
              theme={"light"}
              modalSize={"wide"}
              btnTitle={"⚡ はじめる"}
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div>
            <Image
              src="/eyecatch.png"
              alt="eyecatch"
              width={1200}
              height={1200}
              style={{ objectFit: "contain", borderRadius: "2rem" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
