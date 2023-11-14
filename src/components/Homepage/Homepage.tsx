import {
    Box,
    Button,
    Card,
    Divider,
    HStack,
    Heading,
    Image,
    SimpleGrid,
    Skeleton,
    Spacer,
    Stack,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber,
    Text,
    VStack
} from "@chakra-ui/react";
import { Link as LinkChakra } from "@chakra-ui/react";
import "./Homepage.scss";
import banner from "../../images/main-banner.png";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import millify from "millify";
import SmallChart from "./SmallChart";
import News from "../News";

export type CoinType = {
    "24hVolume": string;
    btcPrice: string;
    change: string;
    coinrankingUrl: string;
    color: string;
    iconUrl: string;
    listedAt: number;
    lowVolume: boolean;
    marketCap: string;
    name: string;
    price: string;
    rank: number;
    sparkline: string[];
    symbol: string;
    tier: number;
    uuid: string;
};


const Homepage = () => {
    const { data, isFetching } = useGetCryptosQuery(9);

    const globalStats = data?.data?.stats;
    const coins = data?.data?.coins;

    return (
        <Box>
            <Box bg={"rgba(55, 114, 255, 0.1);"}>
                <HStack h={"587px"} maxW={"1280px"} margin={"0 auto"} flexWrap={"wrap"} display={"flex"} justifyContent={"space-between"}>
                    <VStack alignItems={"flex-start"} spacing={"20px"} marginLeft="20px">
                        <Heading as="h1" size={"3xl"} maxW={"500px"} color={"#23262F"}>
                            Today’s Cryptocurrency prices
                        </Heading>
                        <Text fontSize={"2xl"} className="title">
                            The global crypto market cap is <b>${millify(globalStats?.totalMarketCap || 0)}</b>
                        </Text>
                    </VStack>
                    <Image src={banner} marginRight="20px" />
                </HStack>
            </Box>
            {isFetching ? (
                <Stack maxW="1200px" margin="100px auto">
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                </Stack>
            ) : (
                <>
                    <Card maxW="1200px" margin="-50px auto 0 auto" padding={"20px"}>
                        <HStack flexWrap={"wrap"} display={"flex"}>
                            <Stat minW="200px">
                                <StatLabel>Total Cryptocurrencies</StatLabel>
                                <StatNumber>{millify(globalStats.total)}</StatNumber>
                            </Stat>
                            <Stat minW="200px">
                                <StatLabel>Total Exchanges</StatLabel>
                                <StatNumber>{millify(globalStats.totalExchanges)}</StatNumber>
                            </Stat>
                            <Stat minW="200px">
                                <StatLabel>Total Market Cup</StatLabel>
                                <StatNumber>${millify(globalStats.totalMarketCap)}</StatNumber>
                            </Stat>
                            <Stat minW="200px">
                                <StatLabel>Total 24h Volume</StatLabel>
                                <StatNumber>${millify(globalStats.total24hVolume)}</StatNumber>
                            </Stat>
                            <Stat minW="200px">
                                <StatLabel>Total Markets</StatLabel>
                                <StatNumber>{millify(globalStats.totalMarkets)}</StatNumber>
                            </Stat>
                        </HStack>
                    </Card>
                    <Box maxW="1200px" margin="0 auto">
                        <HStack margin={"20px 0"}>
                            <Heading size={"xl"}>Top Cryptocurrencies in the world</Heading>
                            <Spacer />
                            <Link to="/cryptocurrencies">
                                <Text fontSize="2xl" color={"#0063d1"} fontWeight={"bold"}>
                                    Show More
                                </Text>
                            </Link>
                        </HStack>
                        <SimpleGrid columns={3} spacing={10} maxW="1200px" margin="0 auto">
                            {coins.map((el: CoinType, i: number) => (
                                <Card padding={"20px"} key={i} minW="350px">
                                    <HStack>
                                        <Text fontSize="2xl">{`${el.rank}.${el.name}`}</Text>
                                        <Image className="crypto-image" src={el.iconUrl} w={"40px"} h={"40px"} />
                                        <Spacer />
                                        <Text fontSize="3xl" fontWeight={"bold"}>
                                            {(+el.price).toFixed(2)}$
                                        </Text>
                                    </HStack>
                                    <HStack marginTop={"20px"}>
                                        <VStack alignItems={"flex-start"}>
                                            <LinkChakra href={el.coinrankingUrl} isExternal color={"#0063d1"}>
                                                Coinranking
                                            </LinkChakra>
                                            <Text>Market Cap: {millify(+el.marketCap)}$</Text>

                                            <Stat>
                                                <StatLabel>Daily Change:</StatLabel>
                                                <StatHelpText>
                                                    <StatArrow type={+el.change > 0 ? "increase" : "decrease"} />
                                                    {millify(+el.change)}%
                                                </StatHelpText>
                                            </Stat>
                                        </VStack>
                                        <Spacer />
                                        <SmallChart chartData={el.sparkline} increase={+el.change > 0} />
                                    </HStack>

                                    <Link to={`/cryptocurrencies/${el.uuid}`} style={{width: "100%"}}><Button marginTop={"20px"} width={"100%"}>Show info</Button></Link>
                                </Card>
                            ))}
                        </SimpleGrid>
                    </Box>
                </>
            )}
            <Divider margin={"20px 0"} />

            <Box maxW="1200px" margin="0 auto">
                <HStack margin={"20px 0"}>
                    <Heading size={"xl"}>Latest Crypto News</Heading>
                    <Spacer />
                    <Link to="/news">
                        <Text fontSize="2xl" color={"#0063d1"} fontWeight={"bold"}>
                            Show More
                        </Text>
                    </Link>
                </HStack>
                <News simplified />
            </Box>
        </Box>
    );
};

export default Homepage;
