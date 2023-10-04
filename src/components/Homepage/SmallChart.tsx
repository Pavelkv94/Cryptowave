import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from "chart.js";
import { Line } from "react-chartjs-2";
import { build24hArray } from "../../utils/build24hArray";
import { Box, Card } from "@chakra-ui/react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

type ChartDataPropsType = {
    chartData: string[];
    increase: boolean;
    smallest?: boolean;
};

const SmallChart = ({ chartData, increase, smallest }: ChartDataPropsType) => {
    const data = {
        labels: build24hArray(),
        datasets: [
            {
                label: "Price In USD",
                data: chartData,
                fill: true,
                backgroundColor: increase ? "rgb(204, 238, 217)" : "#f7c8c8",
                borderColor: increase ? "rgb(88, 189, 125)" : "#d33535",
                cubicInterpolationMode: 'monotone',
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        responsive: true,
        elements: {
            point: {
                radius: 1
            }
        },
        scales: {
            x: {
                display: false 
            },
            y: {
                display: false 
            }
        }
    };

    const optionsSmall = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false // <-- this option disables tooltips
              }
        },
        responsive: true,
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            x: {
                display: false 
            },
            y: {
                display: false 
            }
        }
    };
    return (
        //@ts-ignore
        smallest ? <Box w={"80px"} h="40px"><Line options={optionsSmall} data={data} /></Box> 
        //@ts-ignore
        : <Card w={"200px"} h="100px" variant="outline"><Line options={options} data={data} /></Card>
    );
};

export default SmallChart;
