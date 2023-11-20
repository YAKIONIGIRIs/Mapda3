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
      status: "Active",
    },
    {
      key: "1",
      department: "東京スカイツリー",
      destination: "池袋駅",
      status: "Active",
    },
    {
      key: "2",
      department: "Zoey Lang",
      destination: "Technical Lead",
      status: "Paused",
    },
    {
      key: "3",
      department: "Jane Fisher",
      destination: "Senior Developer",
      status: "Active",
    },
    {
      key: "4",
      department: "William Howard",
      destination: "Community Manager",
      status: "Vacation",
    },
    {
      key: "5",
      department: "Person 5",
      destination: "Role 5",
      status: "Status 5",
    },
    {
      key: "6",
      department: "Person 6",
      destination: "Role 6",
      status: "Status 6",
    },
    {
      key: "7",
      department: "Person 7",
      destination: "Role 7",
      status: "Status 7",
    },
    {
      key: "8",
      department: "Person 8",
      destination: "Role 8",
      status: "Status 8",
    },
    {
      key: "9",
      department: "Person 9",
      destination: "Role 9",
      status: "Status 9",
    },
    {
      key: "10",
      department: "Person 10",
      destination: "Role 10",
      status: "Status 10",
    },
    {
      key: "11",
      department: "Person 11",
      destination: "Role 11",
      status: "Status 11",
    },
    {
      key: "12",
      department: "Person 12",
      destination: "Role 12",
      status: "Status 12",
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
      key: "status",
      label: "STATUS",
    },
  ];

  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Table
          color="primary"
          selectionMode="single"
          aria-label="Example table with dynamic content"
          defaultSelectedKeys={["0"]}
          selectedKeys={[selectedItemIndex.toString()]}
          selectionBehavior="replace"
          onSelectionChange={(key) => {
            const selectedIndex = Array.from(key)[0];
            setSelectedItemIndex(Number(selectedIndex));
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
        <MyGoogleMapComponent path={routeExample[selectedItemIndex]} />
      </div>
    </div>
  );
}
