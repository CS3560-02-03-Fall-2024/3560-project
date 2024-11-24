import Dropdown from "./Dropdown";

export enum COLOR_CODES {
  "Warning" = "#E59523",
  "Danger" = "#E53423",
}

export interface TableProps {
  data: {
    address: string;
    caller_ID: number;
    created_at: string;
    description: string;
    incident_ID: number;
    personnel_ID: number;
    priority: string;
    status: string;
  }[];
}

export default function Table({ data }: TableProps) {
  return (
    <>
      <table className="table-auto">
        <thead className="text-center">
          <tr className="border-b-[1px] pb-[12px]">
            <th>ID</th>
            <th>Description</th>
            <th>Address</th>
            <th>Priority</th>
            <th className="flex flex-row justify-center">
              <Dropdown>
                <p>Status</p>
              </Dropdown>
            </th>
            <th>Assigned Units</th>
            <th className="flex flex-row justify-center">
              <Dropdown>
                <p>Date Reported</p>
              </Dropdown>
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.incident_ID}</td>
              <td>{row.description}</td>
              <td>{row.address}</td>
              <td>{row.priority}</td>
              <td>{row.status}</td>
              <td>{row.personnel_ID}</td>
              <td>{row.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
