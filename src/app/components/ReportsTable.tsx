"use client";

import { TableProps } from "@/components/Table";
import { Report } from "../components/report";

interface ReportsTableProps {
  reports: TableProps["data"];
  onReportClick: (report: TableProps["data"][0]) => void;
  handleSort: (field: keyof TableProps["data"][0]) => void;
  sortBy: keyof TableProps["data"][0] | null;
  sortOrder: "asc" | "desc";
}

export default function ReportsTable({
  reports,
  onReportClick,
  handleSort,
  sortBy,
  sortOrder,
}: ReportsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("incident_ID")}
            >
              ID {sortBy === "incident_ID" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Type {sortBy === "status" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("priority")}
            >
              Priority{" "}
              {sortBy === "priority" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th className="px-4 py-2 border-b">Description</th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("personnel_ID")}
            >
              Units{" "}
              {sortBy === "personnel_ID" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("created_at")}
            >
              Date Reported{" "}
              {sortBy === "created_at" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status {sortBy === "status" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, idx) => (
            <tr key={idx}>
              <td className="px-4 py-2 border-b">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onReportClick(report)}
                >
                  {report.incident_ID}
                </button>
              </td>
              <td className="px-4 py-2 border-b">{report.status}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    report.priority === "High"
                      ? "bg-red-500"
                      : report.priority === "Medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                  }`}
                >
                  {report.priority}
                </span>
              </td>
              <td className="px-4 py-2 border-b">
                {report.description.slice(0, 30)}...
              </td>
              <td className="px-4 py-2 border-b">{report.personnel_ID}</td>
              <td className="px-4 py-2 border-b">{report.created_at}</td>
              <td className="px-4 py-2 border-b">{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
