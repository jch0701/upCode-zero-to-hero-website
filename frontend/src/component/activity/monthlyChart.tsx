import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function MonthlyChart({ data }: { data: { month: string; count: number }[] }) {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: "Monthly Activity",
        data: data.map((d) => d.count),
        borderColor: "rgba(34,197,94,0.8)", // Green
        backgroundColor: "rgba(34,197,94,0.4)",
        tension: 0.3,
        pointRadius: 4,
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
      <h2 className="text-white text-xl font-semibold mb-3">Monthly Activity</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
