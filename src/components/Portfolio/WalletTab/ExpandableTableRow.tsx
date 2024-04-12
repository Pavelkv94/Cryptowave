import { Box, Button, HStack, Image, Td, Text, Tr, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SmallChart from "../../Homepage/SmallChart";
import { useDeleteHistoryMutation } from "../../../store/api/serverApi";
import { IUserHistoryItem } from "../../../types/user.types";
import { Icoin } from "../../../types/coins.types";

type PropsType = {
    coin?: Icoin;
    history: IUserHistoryItem[];
};
const ExpandableTableRow = ({ coin, history }: PropsType) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteHistory] = useDeleteHistoryMutation();

    const coinHistory = history.filter((el: IUserHistoryItem) => el.coin === coin?.name);

    const handleDelete = (transactionId: string) => {
        deleteHistory(transactionId);
    };

    let holdings = 0;

    coinHistory.forEach((transaction: IUserHistoryItem) => {
        if (!holdings) {
            holdings = 0;
        }
        if (transaction.operation === "buy") {
            holdings += parseFloat(transaction.quantity);
        } else if (transaction.operation === "sell") {
            holdings -= parseFloat(transaction.quantity);
        }
    });

    let totalPrice = 0;
    let totalCoinsBought = 0;

    coinHistory.forEach((transaction: IUserHistoryItem) => {
        if (transaction.operation === "buy") {
            totalPrice += parseFloat(transaction.price_per_coin) * parseFloat(transaction.quantity);
            totalCoinsBought += parseFloat(transaction.quantity);
        }
    });

    const averagePricePerCoin = totalPrice / totalCoinsBought;

    const coinPrice = coin ? +coin.price : 0;
    const profit: number = +(coinPrice * holdings - averagePricePerCoin * holdings).toFixed(2);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Tr>
                <Td>
                    <Link to={`/cryptocurrencies/${coin?.uuid}`}>
                        <HStack>
                            <Image src={coin?.iconUrl} w={"20px"} h={"20px"} />
                            <Text>
                                {coin?.name} ({coin?.symbol})
                            </Text>
                        </HStack>
                    </Link>
                </Td>

                <Td>${(coinPrice).toFixed(2)}</Td>

                <Td color={(coin ? +coin.change : 0) < 0 ? "#d33535" : "rgb(88, 189, 125)"}>{coin?.change}%</Td>
                <Td>
                    <SmallChart chartData={coin?.sparkline || []} increase={(coin ? +coin.change : 0) > 0} smallest />
                </Td>
                <Td>
                    <div>
                        <Text color={"gray"}>
                            {holdings} {coin?.symbol}
                        </Text>
                        <Text fontWeight={"bold"}>${(holdings * coinPrice).toFixed(2)}</Text>
                    </div>
                </Td>
                <Td>${averagePricePerCoin.toFixed(2)}</Td>
                <Td color={profit > 0 ? "green" : profit < 0 ? "red" : "gray"}>
                    {profit > 0 ? "+" : profit < 0 ? "-" : ""}${Math.abs(profit)}
                </Td>
                <Td>
                    <Button onClick={handleToggle} size={"sm"}>
                        Transactions
                    </Button>
                </Td>
            </Tr>
            {isOpen && (
                <Tr>
                    <Td colSpan={8}>
                        {coinHistory
                            .map((el: IUserHistoryItem, i: number) => (
                                <Box
                                    key={i}
                                    p="2"
                                    backgroundColor={el.operation === "sell" ? "red.50" : "green.50"}
                                    borderBottom={"1px solid #9bcaff"}
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                >
                                    <VStack align={"start"}>
                                        <Text fontWeight={"bold"}>{el.operation.toUpperCase()}</Text>
                                        <Text color={"gray"} fontSize={12}>
                                            {el.date.replace("T", ", ")}
                                        </Text>
                                    </VStack>
                                    <Text fontSize={14}>
                                        <b>Note:</b> {el.note || <i style={{ color: "gray" }}>No Notes.</i>}
                                    </Text>
                                    <Text fontSize={14}>
                                        <b>Price:</b> ${el.price_per_coin}
                                    </Text>
                                    <Text fontSize={14}>
                                        <b>Amount:</b> {el.quantity}
                                    </Text>
                                    <Text fontSize={14}>
                                        <b>Total:</b> ${el.total}
                                    </Text>
                                    <Button colorScheme="red" onClick={() => handleDelete(el._id)}>
                                        Reject
                                    </Button>
                                </Box>
                            ))
                            .reverse()}
                    </Td>
                </Tr>
            )}
        </>
    );
};

export default ExpandableTableRow;
