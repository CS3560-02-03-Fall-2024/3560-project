"use client";

import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import StatCard from "../components/StatCard";
import Table, { COLOR_CODES, TableProps } from "../components/Table";
import Modal from "../components/Modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const data: TableProps["data"] = [
    {
      id: "000111",
      type: {
        label: "Welfare Check",
        colorcode: COLOR_CODES.Warning,
      },
      priority: 3,
      assignedUnits: "Suarez, O'Brian",
      dateReported: "10-18-24 5:30pm",
    },
  ];
  return (
    <>
      <div className="flex flex-col pt-[30px] gap-y-[30px]">
        <Dropdown>
          <p className="underline">Past 24 hours</p>
        </Dropdown>
        <div className="flex flex-row justify-between">
          <StatCard title="Active Incidents" data={156} />
          <StatCard title="Available Units" data={100} />
          <StatCard title="Reports Submitted" data={30} />
        </div>
        <Card>
          <div className="flex flex-row w-full justify-between">
            <p className="text-2xl font-bold">Open Cases</p>
            <Button onClick={() => setIsOpen(true)} label="Add Report" />
          </div>
          <Table data={data} />
        </Card>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
