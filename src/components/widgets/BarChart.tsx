import React from "react";
import { Container } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface BarChartProps {
  nombre: string;
  labels: Array<string>;
  dataname: string;
  dataValues: Array<number>;
}

const BarChart: React.FC<BarChartProps> = ({
  nombre,
  labels,
  dataname,
  dataValues,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: nombre,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: dataname,
        data: dataValues,
        backgroundColor: "#7a501f",
      },
    ],
  };
  return (
    <Container>
      <Bar options={options} data={data} />
    </Container>
  );
};

export default BarChart;
