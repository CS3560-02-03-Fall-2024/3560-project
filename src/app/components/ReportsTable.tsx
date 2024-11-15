"use client";

import { Report } from "../components/report";

interface ReportsTableProps {
  reports: Report[];
  onReportClick: (report: Report) => void;
  handleSort: (field: keyof Report) => void;
  sortBy: keyof Report | null;
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
              onClick={() => handleSort("id")}
            >
              ID {sortBy === "id" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("type")}
            >
              Type {sortBy === "type" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("priority")}
            >
              Priority {sortBy === "priority" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th className="px-4 py-2 border-b">Summary</th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("units")}
            >
              Units {sortBy === "units" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("dateResolved")}
            >
              Date Resolved {sortBy === "dateResolved" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort("dateReported")}
            >
              Date Reported {sortBy === "dateReported" && (sortOrder === "asc" ? "▲" : "▼")}
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
          {reports.map((report) => (
            <tr key={report.id}>
              <td className="px-4 py-2 border-b">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => onReportClick(report)}
                >
                  {report.id}
                </button>
              </td>
              <td className="px-4 py-2 border-b">{report.type}</td>
              <td className="px-4 py-2 border-b">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    report.priority >= 4
                      ? "bg-red-500"
                      : report.priority === 3
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {report.priority}
                </span>
              </td>
              <td className="px-4 py-2 border-b">{report.summary.slice(0, 30)}...</td>
              <td className="px-4 py-2 border-b">{report.units}</td>
              <td className="px-4 py-2 border-b">{report.dateResolved}</td>
              <td className="px-4 py-2 border-b">{report.dateReported}</td>
              <td className="px-4 py-2 border-b">{report.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
