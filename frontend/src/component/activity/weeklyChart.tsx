import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function WeeklyChart({ data }: { data: { day: string; count: number }[] }) {
  const chartData = {
    labels: data.map((d) => d.day),
    datasets: [
      {
        label: "Weekly Activity",
        data: data.map((d) => d.count),
        backgroundColor: "rgba(99, 102, 241, 0.7)", // Indigo-500
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-gray-900/50 p-4 rounded-2xl shadow-md mt-6">
      <h2 className="text-white text-xl font-semibold mb-3">Weekly Activity</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
}
