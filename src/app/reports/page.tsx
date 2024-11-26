"use client";

import { useState } from "react";
import Header from "../components/Header";
import ReportsTable from "../components/ReportsTable";
import { Report } from "../components/report";
import { TableProps } from "@/components/Table";
import useIncidents from "../hooks/useIncidents";

export default function PublicReports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<
    TableProps["data"][0] | null
  >(null);
  const [sortBy, setSortBy] = useState<keyof TableProps["data"][0] | null>(
    null,
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof TableProps["data"][0]) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const query = useIncidents();

  if (query.isLoading) {
    return "Loading...";
  }

  if (query.error || !query.data) {
    return "Failed to fetch public reports data.";
  }

  const reports = query.data;

  const filteredReports = reports.filter((report) =>
    report.incident_ID.toString().includes(searchQuery),
  );

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (!sortBy) return 0;
    const fieldA = a[sortBy];
    const fieldB = b[sortBy];

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const openModal = (report: TableProps["data"][0]) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className=" min-h-screen p-8 pb-20">
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Public Reports</h2>
          <input
            type="text"
            className="border border-gray-300 rounded p-2"
            placeholder="Search by ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ReportsTable
          reports={sortedReports}
          onReportClick={openModal}
          handleSort={handleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </div>

      {/* Modal with Full Details */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Report Details</h3>
            <p>
              <strong>ID:</strong> {selectedReport.incident_ID}
            </p>
            <p>
              <strong>Status</strong> {selectedReport.status}
            </p>
            <p>
              <strong>Priority:</strong> {selectedReport.priority}
            </p>
            <p>
              <strong>Summary:</strong> {selectedReport.description}
            </p>
            <p>
              <strong>Assigned Unit</strong> {selectedReport.personnel_ID}
            </p>
            <p>
              <strong>Date Reported:</strong> {selectedReport.created_at}
            </p>
            <p>
              <strong>Status:</strong> {selectedReport.status}
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
