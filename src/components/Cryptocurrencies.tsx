import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Box, HStack, Heading, Image, Input, LinkBox, LinkOverlay, Skeleton, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import millify from "millify";
import SmallChart from "./Homepage/SmallChart";
import banner from "../images/Exchanges.png";

import { CoinType } from "./Homepage/Homepage";

const Cryptocurrencies = () => {
    const { data: cryptosList, isFetching } = useGetCryptosQuery(100);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);
        const filteredData = cryptosList?.data?.coins.filter((coin: CoinType) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setCryptos(filteredData);
    }, [searchTerm, cryptosList]);

    return (
        <Box >
            <Box bg={"rgba(55, 114, 255, 0.1);"}>
                <HStack h={"587px"} maxW={"1280px"} margin={"0 auto"} flexWrap={"wrap"} display={"flex"} justifyContent={"space-between"}>
                    <VStack alignItems={"flex-start"} spacing={"20px"} marginLeft="20px">
                        <Heading as="h1" size={"3xl"} maxW={"500px"} color={"#23262F"}>
                            Today's Cryptocurrency prices by Market Cap
                        </Heading>
                    </VStack>
                    <Image src={banner} marginRight="20px" />
                </HStack>
            </Box>
            <Box maxW="1200px" margin="20px auto">
                <Input placeholder="Search CryptoCurrency" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} w={"300px"} />
            </Box>

            {isFetching ? (
                <Stack maxW="1200px" margin="50px auto">
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                </Stack>
            ) : ( <TableContainer marginTop={"20px"} maxW="1200px" margin="0 auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th w={"10px"} paddingRight={"0px"}>
                                #
                            </Th>
                            <Th>Name</Th>
                            <Th>Price</Th>
                            <Th>Market Cap</Th>
                            <Th>24h, %</Th>
                            <Th>Volume(24h)</Th>
                            <Th>Last 24h</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {cryptos?.length === 0 && <Tr><Td>Not Found</Td><Td></Td><Td></Td><Td></Td><Td></Td><Td></Td><Td></Td></Tr>}
                        {cryptos?.map((coin:CoinType, i:number) => (
                            <LinkBox as={Tr} key={i}>
                                <Td w={"10px"} paddingRight={"0px"}>{`${coin.rank}.`}<LinkOverlay href={`/cryptocurrencies//crypto/${coin.uuid}`}/></Td>
                                <Td>
                                    <HStack>
                                        <Image src={coin.iconUrl} w={"20px"} h={"20px"} />
                                        <Text>
                                            {coin.name} ({coin.symbol})
                                        </Text>
                                    </HStack>
                                </Td>
                                <Td>${(+coin.price).toFixed(2)}</Td>
                                <Td>${millify(+coin.marketCap)}</Td>

                                <Td color={+coin.change < 0 ? "#d33535" : "rgb(88, 189, 125)"}>{coin.change}%</Td>
                                <Td>${millify(+coin["24hVolume"])}</Td>
                                <Td>
                                    <SmallChart chartData={coin.sparkline} increase={+coin.change > 0} smallest />
                                </Td>
                            </LinkBox>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>)}
        </Box>
    );
};

export default Cryptocurrencies;