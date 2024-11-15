import Header from "../components/Header";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Header />
      <main className="bg-white shadow-md rounded-lg p-8 mt-4">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        <p>applesauce</p>
      </main>
    </div>
  );
}