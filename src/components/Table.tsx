import Dropdown from "./Dropdown";

export enum COLOR_CODES {
  "Warning" = "#E59523",
  "Danger" = "#E53423",
}

export interface TableProps {
  data: {
    id: string;
    type: {
      label: string;
      colorcode: COLOR_CODES;
    };
    priority: number;
    assignedUnits: string;
    dateReported: string;
  }[];
}

export default function Table({ data }: TableProps) {

  return (
    <>
      <table className="table-auto">
        <thead className="text-center">
          <tr className="border-b-[1px] pb-[12px]">
            <th>ID</th>
            <th>Type</th>
            <th className="flex flex-row justify-center">
              <Dropdown>
                <p>Priority</p>
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
              <td>{row.id}</td>
              <td
                className="rounded-xl max-w-fit text-white"
                style={{ backgroundColor: row.type.colorcode }}
              >
                {row.type.label}
              </td>
              <td>{row.priority}</td>
              <td>{row.assignedUnits}</td>
              <td>{row.dateReported}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
