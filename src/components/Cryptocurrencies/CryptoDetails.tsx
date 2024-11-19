import React, { useState } from "react";
import { useParams } from "react-router-dom";
import millify from "millify";

import {
    AiOutlineDollarCircle,
    AiOutlineNumber,
    AiOutlineThunderbolt,
    AiOutlineTrophy,
    AiOutlineFundProjectionScreen,
    AiOutlineMoneyCollect,
    AiOutlineExclamationCircle,
    AiOutlineCheckCircle,
    AiOutlineStop
} from "react-icons/ai";
import {
    Box,
    Card,
    Center,
    HStack,
    Heading,
    Icon,
    Image,
    Link,
    Select,
    SimpleGrid,
    Skeleton,
    Spacer,
    Spinner,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tr,
    VStack
} from "@chakra-ui/react";
import LineChart from "../LineChart";
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from "../../store/api/cryptoApi";

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState<string>("7d");

    const { data, isLoading } = useGetCryptoDetailsQuery(coinId || "1");
    const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });

    const cryptoDetails = data && data.coin;

    const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

    const stats = cryptoDetails
        ? [
              { title: "Price to USD", value: `$ ${cryptoDetails?.price && millify(+cryptoDetails?.price)}`, icon: AiOutlineDollarCircle },
              { title: "Rank", value: cryptoDetails?.rank, icon: AiOutlineNumber },
              { title: "24h Volume", value: `$ ${cryptoDetails["24hVolume"] && millify(+cryptoDetails["24hVolume"])}`, icon: AiOutlineThunderbolt },
              { title: "Market Cap", value: `$ ${cryptoDetails?.marketCap && millify(+cryptoDetails?.marketCap)}`, icon: AiOutlineDollarCircle },
              {
                  title: "All-time-high(daily avg.)",
                  value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(+cryptoDetails?.allTimeHigh?.price)}`,
                  icon: AiOutlineTrophy
              }
          ]
        : [];

    const genericStats = [
        { title: "Number Of Markets", value: cryptoDetails?.numberOfMarkets, icon: AiOutlineFundProjectionScreen },
        { title: "Number Of Exchanges", value: cryptoDetails?.numberOfExchanges, icon: AiOutlineMoneyCollect },
        {
            title: "Aprroved Supply",
            value: cryptoDetails?.supply?.confirmed ? <Icon as={AiOutlineCheckCircle} /> : <Icon as={AiOutlineStop} />,
            icon: AiOutlineExclamationCircle
        },
        { title: "Total Supply", value: `$ ${cryptoDetails?.supply?.total && millify(+cryptoDetails?.supply?.total)}`, icon: AiOutlineExclamationCircle },
        {
            title: "Circulating Supply",
            value: `$ ${cryptoDetails?.supply?.circulating && millify(+cryptoDetails?.supply?.circulating)}`,
            icon: AiOutlineExclamationCircle
        }
    ];

    if (isLoading)
        return (
            <Center w="100%" h="90vh">
                <Spinner size={"xl"} color="#0078ff" />
            </Center>
        );

    return (
        <Box maxW={"1200px"} margin={"0 auto"}>
            <Center margin={"40px 0"}>
                <Image src={cryptoDetails?.iconUrl} w={"40px"} h={"40px"} marginRight={"20px"} />
                <Heading>
                    {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
                </Heading>
            </Center>
            <HStack margin={"40px 0"}>
                <Card maxW="500px" padding="20px">
                    <Text fontSize={"xl"}>
                        What is {cryptoDetails?.name}?<br />
                        {cryptoDetails?.description}
                    </Text>
                </Card>
                <Spacer />
                <VStack alignItems={"flex-start"} w={"300px"}>
                    <Text fontSize={"xl"}>Select Time period:</Text>
                    <Select defaultValue="7d" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTimePeriod(e.target.value)}>
                        {time.map((date) => (
                            <option key={date}>{date}</option>
                        ))}
                    </Select>
                </VStack>
            </HStack>
            {coinHistory && cryptoDetails ? (
                <LineChart coinHistory={coinHistory} currentPrice={(+cryptoDetails?.price).toFixed(2)} coinName={cryptoDetails?.name} />
            ) : (
                <Stack maxW="1200px" margin="100px auto">
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                </Stack>
            )}

            <SimpleGrid columns={3} spacing={10} maxW="1200px" margin={"20px 0"} display={"flex"} justifyContent={"space-between"} flexWrap={"wrap"}>
                <Card padding="20px" minW="350px">
                    <Text fontSize={"2xl"}>
                        {" "}
                        <b>{cryptoDetails?.name}</b> Value Statistics
                    </Text>
                    <Text fontSize={"sm"} color={"gray"}>
                        An overview showing the stats of <b>{cryptoDetails?.name}</b>
                    </Text>
                    <TableContainer>
                        <Table>
                            <Tbody>
                                {stats.map(({ icon, title, value }, i) => (
                                    <Tr key={i}>
                                        <Td paddingRight={"0"}>
                                            <Icon as={icon} /> {title}
                                        </Td>
                                        <Td paddingRight={"0"}>{value}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
                <Card padding="20px" minW="350px">
                    <Text fontSize={"2xl"}>Other Statistics</Text>
                    <Text fontSize={"sm"} color={"gray"}>
                        An overview showing the stats of all cryptocurrencies
                    </Text>
                    <TableContainer>
                        <Table>
                            <Tbody>
                                {genericStats.map(({ icon, title, value }, i) => (
                                    <Tr key={i}>
                                        <Td paddingRight={"0"}>
                                            <Icon as={icon} /> {title}
                                        </Td>
                                        <Td paddingRight={"0"}>{value}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
                <Card padding="20px" minW="350px">
                    <Text fontSize={"2xl"}>{cryptoDetails?.name} Links</Text>
                    <TableContainer>
                        <Table>
                            <Tbody>
                                {cryptoDetails &&
                                    cryptoDetails.links &&
                                    cryptoDetails.links.map((link: { type: string; url: string; name: string }, i: number) => (
                                        <Tr key={i}>
                                            <Td>{link.type}</Td>
                                            <Td>
                                                <Link href={link.url} isExternal color="#0078ff">
                                                    {link.name}
                                                </Link>
                                            </Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Card>
            </SimpleGrid>
        </Box>
    );
};

export default CryptoDetails;
