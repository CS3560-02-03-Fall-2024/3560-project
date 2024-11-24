import { TableProps } from "@/components/Table";
import { useQuery } from "@tanstack/react-query";

const useIncidents = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: async () => {
      const reports = await fetch("/api/incidents");
      const body = await reports.json();

      return body as TableProps["data"];
    },
  });
};
export default useIncidents;
