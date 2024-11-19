import {
    Box,
    Center,
    HStack,
    Heading,
    Image,
    Input,
    LinkBox,
    LinkOverlay,
    Skeleton,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack
} from "@chakra-ui/react";
import millify from "millify";
import { useEffect, useState } from "react";
import banner from "../../assets/images/currency-banner.png";
import { useGetCryptosExchangesQuery } from "../../store/api/cryptoExchangesAPI";
import {tempExchanges} from "./exchanges";
import { IExchanges } from "../../types/coins.types";

const Exchanges = () => {
    const { data: exchangesList, isLoading, isError } = useGetCryptosExchangesQuery(null);
    const [exchanges, setExchanges] = useState<IExchanges[] | undefined>([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        isError && setExchanges(tempExchanges)
    }, [isError])
    useEffect(() => {
        setExchanges(exchangesList);
        const filteredData:IExchanges[]  = exchangesList ? exchangesList.filter((ex: IExchanges) => ex.name.toLowerCase().includes(searchTerm.toLowerCase())) : [];
        setExchanges(filteredData);
    }, [searchTerm, exchangesList]);

    const setExchangeColor = (rank: number) => (rank > 7 ? "green" : rank > 4 ? "orange" : "red");

    return (
        <div>
            <Box bg={"rgba(55, 114, 255, 0.1);"}>
                <HStack h={"487px"} maxW={"1280px"} margin={"0 auto"} flexWrap={"wrap"} display={"flex"} justifyContent={"space-between"}>
                    <VStack alignItems={"flex-start"} spacing={"20px"} marginLeft="20px">
                        <Heading as="h1" size={"3xl"} maxW={"500px"} color={"#23262F"}>
                            Top Cryptocurrensy exchanges
                        </Heading>
                    </VStack>
                    <Image src={banner} marginRight="20px" maxW="250px" />
                </HStack>
            </Box>
            <Box maxW="1200px" margin="20px auto">
                <Input placeholder="Search Exchanges" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} w={"300px"} />
            </Box>
            {isLoading ? (
                <Stack maxW="1200px" margin="50px auto">
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                </Stack>
            ) : (
                <TableContainer marginTop={"20px"} maxW="1200px" margin="0 auto">
                    <Table variant="simple" size={"sm"}>
                        <Thead>
                            <Tr>
                                <Th w={"10px"} paddingRight={"0px"}>
                                    #
                                </Th>
                                <Th>Name</Th>
                                <Th>Country</Th>
                                <Th>Created</Th>
                                <Th> btc Volume(24h) </Th>
                                <Th> btc Volume(24h) normal </Th>
                                <Th>Trust Score</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {exchanges?.length === 0 && (
                                <Tr>
                                    <Td>Not Found</Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                </Tr>
                            )}
                            {exchanges?.map((el: IExchanges, i: number) => (
                                <LinkBox as={Tr} key={i}>
                                    <Td w={"10px"} paddingRight={"0px"}>
                                        {el.trust_score_rank}
                                    </Td>
                                    <Td>
                                        <HStack>
                                            <Image src={el.image} w="40px" h="40px" />
                                            <Text fontWeight={"bold"}>{el.name}</Text>
                                            <LinkOverlay isExternal href={el.url} />
                                        </HStack>
                                    </Td>
                                    <Td>{el.country}</Td>
                                    <Td>
                                        <Center>{el.year_established || "-"}</Center>
                                    </Td>
                                    <Td>
                                        <Center>${millify(el.trade_volume_24h_btc)}</Center>
                                    </Td>
                                    <Td>
                                        <Center>${millify(el.trade_volume_24h_btc_normalized)}</Center>
                                    </Td>
                                    <Td fontWeight={"bold"} color={setExchangeColor(el.trust_score)}>
                                        <Center>{el.trust_score}</Center>
                                    </Td>
                                </LinkBox>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default Exchanges;
