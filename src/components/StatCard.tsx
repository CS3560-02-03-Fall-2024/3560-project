import Card from "./Card";

interface StatCardProps {
  title: string;
  data: number;
}
export default function StatCard({ title, data }: StatCardProps) {
  return (
    <Card title={title}>
      <p>{data}</p>
    </Card>
  );
}
