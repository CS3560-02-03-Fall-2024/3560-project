"use client";

import { useState } from "react";
import Header from "../components/Header";
import ReportsTable from "../components/ReportsTable";
import { Report } from "../components/report";

export default function PublicReports() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [sortBy, setSortBy] = useState<keyof Report | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const reports: Report[] = [
    {
      id: "000111",
      type: "Welfare Check",
      priority: 2,
      summary: "The officers visited the location and ensured the safety of all occupants...",
      units: 3,
      dateResolved: "10-18-24 5:30pm",
      dateReported: "10-18-24 6:30pm",
      status: "Resolved",
    },
    {
      id: "000112",
      type: "Home Invasion",
      priority: 5,
      summary: "The officers responded promptly to the scene of the home invasion...",
      units: 8,
      dateResolved: "10-17-24 3:30am",
      dateReported: "10-17-24 3:45am",
      status: "In Progress",
    },
  ];

  const handleSort = (field: keyof Report) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredReports = reports.filter((report) =>
    report.id.includes(searchQuery)
  );

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (!sortBy) return 0;
    const fieldA = a[sortBy];
    const fieldB = b[sortBy];

    if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const openModal = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 pb-20">
      <Header />

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

        <ReportsTable reports={sortedReports} onReportClick={openModal} handleSort={handleSort} sortBy={sortBy} sortOrder={sortOrder} />
      </div>

      {/* Modal with Full Details */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Report Details</h3>
            <p><strong>ID:</strong> {selectedReport.id}</p>
            <p><strong>Type:</strong> {selectedReport.type}</p>
            <p><strong>Priority:</strong> {selectedReport.priority}</p>
            <p><strong>Summary:</strong> {selectedReport.summary}</p>
            <p><strong>Units:</strong> {selectedReport.units}</p>
            <p><strong>Date Resolved:</strong> {selectedReport.dateResolved}</p>
            <p><strong>Date Reported:</strong> {selectedReport.dateReported}</p>
            <p><strong>Status:</strong> {selectedReport.status}</p>
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
