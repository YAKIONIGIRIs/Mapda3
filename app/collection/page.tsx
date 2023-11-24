"use client";
import { title } from "@/components/primitives";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  getKeyValue,
  useDisclosure,
} from "@nextui-org/react";
import {
  ThirdwebNftMedia,
  Web3Button,
  useAddress,
  useContract,
  useNFTs,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import NextLink from "next/link";
import React from "react";
import MyGoogleMapComponent from "./map";
import { routeExample } from "./routeExample";
export default function HomePage() {
  const rows = [
    {
      key: "0",
      department: "東京駅",
      destination: "六本木",
      user: "Alice",
      userImage: "/vla/001.png",
    },
    {
      key: "1",
      department: "東京スカイツリー",
      destination: "池袋駅",
      user: "Bob",
      userImage: "/vla/001.png",
    },
    {
      key: "2",
      department: "マツダスタジアム",
      destination: "宮島口",
      user: "Charlie",
      userImage: "/vla/001.png",
    },
    {
      key: "3",
      department: "日光東照宮",
      destination: "いろは坂",
      user: "Dave",
      userImage: "/vla/001.png",
    },
  ];

  const columns = [
    // { key: "userImage", label: "ユーザー" },
    { key: "title", label: "タイトル" },
    {
      key: "department",
      label: "出発",
    },
    {
      key: "destination",
      label: "到着",
    },
    // { key: "action", label: "claim" },
  ];

  type ModalPhase = "claim" | "success";

  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPhase, setModalPhase] = React.useState<ModalPhase>("claim");

  const center = {
    lat: 35.6653282,
    lng: 139.73645059999998,
  };

  interface Path {
    lat: number;
    lng: number;
  }

  const getCenter = (path: Path[] | null) => {
    if (path === null) {
      return;
    }
    const lat = path.map((p) => p.lat);
    const lng = path.map((p) => p.lng);
    const center = {
      lat: (Math.max(...lat) + Math.min(...lat)) / 2,
      lng: (Math.max(...lng) + Math.min(...lng)) / 2,
    };
    return center;
  };
  const walletAddress = useAddress();
  const contractAddress = "0x3a717c0cCE5bdF8a662B238cF1245CC90e87b21e";
  const { contract } = useContract(contractAddress);
  const { data: nfts } = useOwnedNFTs(contract, walletAddress);

  const getVeryLongAnimalImageName = (userID: string) => {
    const lastFour = userID.slice(-4);

    // Convert to a number and calculate (lastThree % 96 + 1)
    const id = (parseInt(lastFour, 16) % 96) + 1;
    return "/vla/" + id.toString().padStart(3, "0") + ".png";
  };

  const tableData = nfts?.map((nft, i) => {
    return {
      key: String(i),
      title: nft.metadata.name,
      // @ts-ignore
      department: nft.metadata?.attributes[0].value,
      // @ts-ignore
      destination: nft.metadata?.attributes[1].value,
      // @ts-ignore
      route: JSON.parse(nft.metadata?.attributes[2].value),
      // @ts-ignore
      user: nft.metadata?.attributes[3].value,
      // @ts-ignore
      userImage: getVeryLongAnimalImageName(nft.metadata?.attributes[3].value),
      action: "claim",
    };
  });

  return (
    <>
      {tableData === undefined ? (
        <div className="flex flex-col items-center justify-center mb-8 pt-8">
          <Spinner label="Loading..." />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center mb-8 pt-8">
            <h1 className={title({ size: "sm" })}>みんなの経路🚗</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Table
                color="primary"
                selectionMode="single"
                aria-label="Path table"
                disallowEmptySelection
                defaultSelectedKeys={["0"]}
                selectedKeys={[selectedItemIndex.toString()]}
                selectionBehavior="replace"
                onSelectionChange={(key) => {
                  const selectedIndex = Array.from(key)[0];
                  setSelectedItemIndex(Number(selectedIndex ?? 0));
                }}
              >
                <TableHeader columns={columns}>
                  {(column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                  )}
                </TableHeader>
                <TableBody items={tableData}>
                  {(item) => (
                    <TableRow key={item.key}>
                      {(columnKey) => (
                        <TableCell>
                          {columnKey === "userImage" ? (
                            <Avatar
                              src={item.userImage}
                              size="md"
                              radius="lg"
                            />
                          ) : columnKey === "action" ? (
                            <Tooltip content="NFTマップを取得">
                              <PlusCircleIcon
                                className="h-5 w-5 cursor-pointer"
                                onClick={onOpen}
                              />
                            </Tooltip>
                          ) : (
                            getKeyValue(item, columnKey)
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <ThirdwebNftMedia
                metadata={nfts![selectedItemIndex].metadata}
                width="100%"
                height="auto"
                className="mt-8 rounded-xl"
              />
            </div>
            <div>
              <MyGoogleMapComponent
                // @ts-ignore
                path={routeExample[selectedItemIndex]}
                center={getCenter(routeExample[selectedItemIndex]) ?? center}
              />
            </div>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            {modalPhase === "claim" ? (
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      NFTマップを取得
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        <b>{tableData![selectedItemIndex].title}</b>
                        のNFTマップをClaim（購入）しますか？
                      </p>
                      <p>
                        購入するとNFTマップに紐づいたストリートビューが閲覧できるようになります。
                      </p>
                    </ModalBody>
                    <ModalFooter className="flex">
                      <Button variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Web3Button
                        theme={"light"}
                        contractAddress={contractAddress}
                        action={(contract) => contract.erc1155.claim(0, 1)}
                        onSuccess={() => setModalPhase("success")}
                      >
                        Claim NFT
                      </Web3Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            ) : (
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Claim完了
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        <b>{tableData![selectedItemIndex].title}</b>
                        のNFTマップをClaim（購入）しました🎉
                      </p>
                    </ModalBody>
                    <ModalFooter className="flex">
                      <Button variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="success" href="/collection" as={NextLink}>
                        ルートコレクションへ
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            )}
          </Modal>
        </>
      )}
    </>
  );
}
