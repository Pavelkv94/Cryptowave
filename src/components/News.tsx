import React, { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptosNewsQuery } from "../services/cryptoNewsApi";
import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardFooter,
    Center,
    HStack,
    Heading,
    Image,
    Select,
    SimpleGrid,
    Skeleton,
    Spacer,
    Stack,
    Text,
    VStack
} from "@chakra-ui/react";
import { Link as LinkChakra } from "@chakra-ui/react";
import { CoinType } from "./Homepage/Homepage";

const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

type NewsPropsType = {
    simplified?: boolean;
};

interface ImageObject {
    thumbnail: string;
    original: string;
}

interface NewsArticle {
    title: string;
    snippet: string;
    publisher: string;
    timestamp: string;
    newsUrl: string;
    images: ImageObject;
}

const News = ({ simplified }: NewsPropsType) => {
    const [newsCategory, setNewsCategory] = useState<React.ChangeEvent<HTMLSelectElement> | string>("Cryptocurrency");
    const { data } = useGetCryptosQuery(100);
    const {data: cryptoNews} = useGetCryptosNewsQuery({ newsCategory, count: simplified ? 6 : 21 });

    const news = simplified ? cryptoNews?.items.slice(0, 12) : cryptoNews?.items;

    const formatDate = (timestamp: number) => {
        const now = Date.now();
        const differenceInSeconds = Math.floor((now - timestamp) / 1000);

        const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

        let formattedTimestamp;

        if (differenceInSeconds < 60) {
            formattedTimestamp = rtf.format(-differenceInSeconds, "second");
        } else if (differenceInSeconds < 3600) {
            const minutes = Math.floor(differenceInSeconds / 60);
            formattedTimestamp = rtf.format(-minutes, "minute");
        } else {
            const hours = Math.floor(differenceInSeconds / 3600);
            formattedTimestamp = rtf.format(-hours, "hour");
        }
        return formattedTimestamp;
    };

    if (!news)
        return (
            <Stack maxW="1200px" margin="100px auto">
                <Skeleton height="80px" />
                <Skeleton height="80px" />
                <Skeleton height="80px" />
                <Skeleton height="80px" />
                <Skeleton height="80px" />
                <Skeleton height="80px" />
            </Stack>
        );

    return (
        <Box maxW={"1200px"} margin={"0 auto"}>
            {!simplified && (
                <Center margin={"40px 0"}>
                    <Heading>Latest Crypto News</Heading>
                </Center>
            )}
            {!simplified && (
                <HStack marginBottom={"40px"}>
                    <Text fontSize={"md"}>Select news category: </Text>
                    <Select w="300px" defaultValue={"Cryptocurency"} onChange={(e) => setNewsCategory(e.target.value)}>
                        <option value="Cryptocurency">Cryptocurrency</option>
                        {data?.data?.coins?.map((currency: CoinType, i: number) => (
                            <option key={i} value={currency.name}>
                                {currency.name}
                            </option>
                        ))}
                    </Select>
                </HStack>
            )}

            <SimpleGrid columns={3} spacing={10} display={"flex"} flexWrap={"wrap"}>
                {news.map((news: NewsArticle, i: number) => (
                    <Card key={i} direction={{ base: "column" }} overflow="hidden" variant="outline" minW="350px" maxW="370px">
                        <HStack padding={"20px 20px 0 20px"}>
                            <Image objectFit="contain" maxW={{ base: "40%", sm: "100%" }} height={220} src={news?.images?.thumbnail || demoImage} alt="Caffe Latte" />
                            
                        </HStack>
                        <Heading padding={"20px 20px 0 20px"} size="md">{news.title}</Heading>
                        <CardBody paddingBottom={"0"}>
                            <Text py="2">{news.snippet.length > 100 ? `${news.snippet.substring(0, 200)}...` : news.snippet}</Text>
                        </CardBody>

                        <CardFooter>
                            <HStack w="100%">
                                <VStack alignItems={"flex-start"}>
                                    <HStack>
                                        <Avatar src={demoImage} />
                                        <Text className="provider-name">{news.publisher}</Text>
                                    </HStack>
                                    <Text fontSize={"sm"} color={"gray"}>
                                        {/* @ts-ignore */}
                                        {formatDate(news.timestamp)}
                                    </Text>
                                </VStack>
                                <Spacer />
                                <LinkChakra href={news.newsUrl} isExternal color={"#0063d1"}>
                                    Read more
                                </LinkChakra>
                            </HStack>
                        </CardFooter>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default News;
