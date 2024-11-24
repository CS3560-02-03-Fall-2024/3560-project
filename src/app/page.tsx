"use client";

import { useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Dropdown from "../components/Dropdown";
import StatCard from "../components/StatCard";
import Table, { COLOR_CODES, TableProps } from "../components/Table";
import Modal from "../components/Modal";
import useIncidents from "./hooks/useIncidents";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const query = useIncidents();

  if (query.isLoading) {
    return "Loading...";
  }

  if (query.error || !query.data) {
    return <>Error: ${query.error}</>;
  }

  const data = query.data;
  return (
    query.data && (
      <>
        <div className="flex flex-col pt-[30px] gap-y-[30px]">
          <p className="underline">Past 24 hours</p>
          <div className="flex flex-row justify-between">
            <StatCard title="Active Incidents" data={data.length} />
            <StatCard title="Available Units" data={100 - data.length} />
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
    )
  );
}
