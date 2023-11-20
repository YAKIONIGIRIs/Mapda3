"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import MyGoogleMapComponent from "./map";
import { routeExample } from "./routeExample";
import React from "react";

export default function WelcomePage() {
  const rows = [
    {
      key: "0",
      department: "東京駅",
      destination: "六本木",
      user: "Alice",
    },
    {
      key: "1",
      department: "東京スカイツリー",
      destination: "池袋駅",
      user: "Bob",
    },
    {
      key: "2",
      department: "マツダスタジアム",
      destination: "宮島口",
      user: "Charlie",
    },
  ];

  const columns = [
    {
      key: "department",
      label: "出発",
    },
    {
      key: "destination",
      label: "到着",
    },
    {
      key: "user",
      label: "ユーザー",
    },
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

  return (
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
            console.log(selectedIndex);
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <MyGoogleMapComponent
          path={routeExample[selectedItemIndex]}
          center={getCenter(routeExample[selectedItemIndex]) ?? center}
        />
      </div>
    </div>
  );
}
