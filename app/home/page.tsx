"use client";
import { title } from "@/components/primitives";
import {
  Avatar,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import {
  NFT,
  NFTMetadata,
  Web3Button,
  useAddress,
  useContract,
  useNFTs,
} from "@thirdweb-dev/react";
import React from "react";
import MyGoogleMapComponent from "./map";
import { routeExample } from "./routeExample";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { table } from "console";
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
    { key: "userImage", label: "ユーザー" },
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
    // {
    //   key: "user",
    //   label: "ユーザー",
    // },
  ];

  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

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

  // TODO: useNFTsして全部のデータを取ってくる
  // publisherの項目から、何かしらユーザー名を表示する

  const [loading, setLoading] = React.useState(true);

  const walletAddress = useAddress();
  const contractAddress = "0x3a717c0cCE5bdF8a662B238cF1245CC90e87b21e";
  const { contract, isLoading: isContractLoading } =
    useContract(contractAddress);
  const { data: nfts, isLoading: isNFTLoading } = useNFTs(contract);
  console.log(nfts);
  console.log(isNFTLoading);

  const getVeryLongAnimalImageName = (userID: string) => {
    const lastFour = userID.slice(-4);

    // Convert to a number and calculate (lastThree % 96 + 1)
    const id = (parseInt(lastFour, 16) % 96) + 1;
    return "/vla/" + id.toString().padStart(3, "0") + ".png";
  };
  // let tableData= {};

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
  console.log(tableData);

  React.useEffect(() => {
    if (
      tableData !== undefined &&
      tableData.length > 0 &&
      isNFTLoading === false &&
      isContractLoading === false
    ) {
      setLoading(false);
    }
  }, [tableData]);

  // const { mutateAsync: claimNft } = useClaimNFT(contract);

  // const { data: nft } = useNFT(contract, 3);
  // console.log(nft);
  // const route = nft?.metadata?.attributes;
  // // eslint-disable-next-line
  // // console.log(JSON.parse(route[2].value));
  // const { data: contractData } = useMetadata(contract);
  // console.log(contractData);

  // const { data: nft2 } = useOwnedNFTs(contract, walletAddress);
  // console.log(nft2);

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
                          ) : (
                            getKeyValue(item, columnKey)
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div>
              <MyGoogleMapComponent
                // @ts-ignore
                path={routeExample[selectedItemIndex]}
                center={getCenter(routeExample[selectedItemIndex]) ?? center}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
