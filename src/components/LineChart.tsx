import { Center, Spacer, Stat, StatArrow, Text, Wrap } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";

type HistoryType = {
    price: string;
    timestamp: number;
};
type LinePropsType = {
    coinHistory: {
        data?: {
            change: string;
            history: Array<HistoryType> | any;
        };
    };
    currentPrice: string;
    coinName: string;
};
const LineChart = ({ coinHistory, currentPrice, coinName }: LinePropsType) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
    }
    const data = {
        labels: coinTimestamp.reverse(),
        datasets: [
            {
                label: "Price In USD",
                data: coinPrice.reverse(),
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd"
            }
        ]
    };

    const options = {
        elements: {
            point: {
                radius: 2
            }
        },
        scales: { y: { ticks: { beginAtZero: true } } }
    };

    return (
        <>
            <Center>
                <Wrap>
                    <Text>{coinName} Price Chart</Text>
                    <Spacer />
                    <Stat>
                        {/* @ts-ignore */}
                        <StatArrow type={+coinHistory?.data?.change > 0 ? "increase" : "decrease"} />
                    </Stat>
                    {/* @ts-ignore */}
                    <Text color={coinHistory?.data?.change < 0 ? "#d33535" : "rgb(88, 189, 125)"}>{coinHistory?.data?.change}%</Text>
                    <Spacer />
                    <Text>
                        Current {coinName} Price: <b>${currentPrice}</b>
                    </Text>
                </Wrap>
            </Center>

            {/* @ts-ignore */}
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;
