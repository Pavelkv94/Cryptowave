import { Center, Spacer, Stat, StatArrow, Text, Wrap } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { CoinHistoryDataType } from "../types/coins.types";

type LinePropsType = {
    coinHistory: CoinHistoryDataType;
    currentPrice?: string;
    coinName?: string;
};
const LineChart = ({ coinHistory, currentPrice, coinName }: LinePropsType) => {
    const coinPrice = [];
    const coinTimestamp = [];

    for (let i = 0; i < coinHistory?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.history[i].price);
        coinTimestamp.push(new Date(+coinHistory?.history[i].timestamp * 1000).toLocaleString());
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
                    <Text>
                        <b>{coinName}</b> Price Chart
                    </Text>
                    <Spacer />
                    <Stat>
                        <StatArrow type={+coinHistory?.change > 0 ? "increase" : "decrease"} />
                    </Stat>
                    <Text color={+coinHistory?.change < 0 ? "#d33535" : "rgb(88, 189, 125)"}>{coinHistory?.change}%</Text>
                    <Spacer />
                    <Text>
                        Current <b>{coinName}</b> Price: <b>${currentPrice}</b>
                    </Text>
                </Wrap>
            </Center>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Line data={data} options={options} />
        </>
    );
};

export default LineChart;
