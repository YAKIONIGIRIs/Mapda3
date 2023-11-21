"use client";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { ConnectWallet } from "@thirdweb-dev/react";
import NextLink from "next/link";

export default function Home() {
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
        href="/welcome"
        size="lg"
        as={NextLink}
      >
        開始
      </Button>
      <ConnectWallet theme={"light"} modalSize={"wide"} />
    </section>
  );
}
