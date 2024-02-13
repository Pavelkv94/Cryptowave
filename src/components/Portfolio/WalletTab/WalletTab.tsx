import {
    Button,
    Card,
    CardBody,
    CardHeader,
    HStack,
    Heading,
    Icon,
    Skeleton,
    Stack,
    TabPanel,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { useGetCryptosQuery } from "../../../services/cryptoApi";
import TransactionModal from "./TransactionModal";
import { useGetHistoryQuery } from "../../../services/serverApi";
import ExpandableTableRow from "./ExpandableTableRow";
import { RepeatClockIcon } from "@chakra-ui/icons";

const WalletTab = () => {
    const { data: cryptosList, isFetching, refetch: refetchCryptos } = useGetCryptosQuery(100);
    //@ts-ignore
    const { data: history, isFetchingHistory, refetch: refetchHistory } = useGetHistoryQuery("");

    const refreshData = () => {
        refetchCryptos();
    };
    let totalBalance = 0;
    let totalProfit = 0;

    history?.forEach((transaction) => {
        const coin = cryptosList?.data?.coins.find((el: any) => el.name === transaction.coin);
        if (transaction.operation === "buy") {
            totalBalance += parseFloat(transaction.quantity) * parseFloat(coin?.price);
            totalProfit += (parseFloat(transaction.quantity) * parseFloat(coin?.price) - (parseFloat(transaction.quantity) * parseFloat(transaction.price_per_coin)))
        }
        if (transaction.operation === "sell") {
            totalBalance -= parseFloat(transaction.quantity) * parseFloat(coin?.price);
            totalProfit -= (parseFloat(transaction.quantity) * parseFloat(coin?.price) - (parseFloat(transaction.quantity) * parseFloat(transaction.price_per_coin)))
        }
    });

    const uniqueCoinsInHistory = [...new Map(history?.map((item: any) => [item["coin"], item])).values()];

    return (
        <TabPanel>
            <HStack align={"flex-start"} marginBottom={10}>
                <Card width={300}>
                    <CardHeader>
                        <Text size="md">My balance</Text>
                    </CardHeader>
                    <CardBody paddingTop={0}>
                        <Heading size="sm" color={totalProfit > 0 ? "green.500" : "red.500"}>{totalProfit > 0 ? "+" : "-"}${Math.abs(totalProfit.toFixed(2))}</Heading>
                        <Heading size="md">${totalBalance.toFixed(2)}</Heading>
                    </CardBody>
                </Card>
                <TransactionModal coins={cryptosList?.data?.coins} />
                <Button justifySelf={"end"} onClick={refreshData}>
                    <Icon as={RepeatClockIcon} marginRight={"2"} />
                    Refresh
                </Button>
            </HStack>
            {isFetching && isFetchingHistory ? (
                <Stack maxW="1400px" margin="50px auto">
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                </Stack>
            ) : (
                <TableContainer marginTop={"20px"} maxW="1400px" margin="0 auto">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Price</Th>
                                <Th>24h, %</Th>
                                <Th>Last 24h</Th>
                                <Th>Holdings</Th>
                                <Th>Avg. buy price</Th>
                                <Th>Profit/Loss</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {history?.length === 0 && (
                                <Tr>
                                    <Td>Your portfolio is empty.</Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                </Tr>
                            )}
                            {uniqueCoinsInHistory?.map((item: any, i: number) => {
                                const coin = cryptosList?.data?.coins.find((el: any) => el.name === item.coin);
                                return <ExpandableTableRow key={i} coin={coin} history={history} refetchHistory={refetchHistory} />;
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </TabPanel>
    );
};

export default WalletTab;
