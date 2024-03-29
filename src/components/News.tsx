import React, { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
//@ts-ignore
import { useGetCryptosNewsQuery } from "../services/cryptoNewsApi";
import { Box, Card, CardBody, CardFooter, Center, HStack, Heading, Image, Select, SimpleGrid, Skeleton, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import { Link as LinkChakra } from "@chakra-ui/react";
import { CoinType } from "./Homepage/Homepage";

const demoImage = "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png";

type NewsPropsType = {
    simplified?: boolean;
};

interface ImageObject {
    thumbnail: string;
    original: string;
}

interface NewsArticle {
    title: string;
    description: string;
    author: string;
    timestamp: string;
    url: string;
    urlToImage: ImageObject;
    source: {
        name: string;
    };
}

const News = ({ simplified }: NewsPropsType) => {
        //@ts-ignore
    const [newsCategory, setNewsCategory] = useState<React.ChangeEvent<HTMLSelectElement> | string>("Cryptocurrency");
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptosNewsQuery({ newsCategory, count: simplified ? 6 : 21 });
    //@ts-ignore
    const news:any = simplified ? cryptoNews?.articles.slice(0, 12) : cryptoNews?.articles;

    const formatDate = (timestamp: number) => {
        const oldDate = new Date(timestamp);
        const now = Date.now();
        //@ts-ignore
        const differenceInSeconds = Math.floor((now - oldDate) / 1000);

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
                            {/*@ts-ignore */}
                            <Image objectFit="contain" maxW={{ base: "40%", sm: "100%" }} height={220} src={news?.urlToImage || demoImage} alt="Caffe Latte" />
                        </HStack>
                        <Heading padding={"20px 20px 0 20px"} size="md">
                            {news.title}
                        </Heading>
                        <CardBody paddingBottom={"0"}>
                            <Text py="2">{news.description?.length > 100 ? `${news.description.substring(0, 200)}...` : news.description}</Text>
                        </CardBody>

                        <CardFooter>
                            <HStack w="100%">
                                <VStack alignItems={"flex-start"}>
                                    <VStack alignItems={"flex-start"}>
                                        <Text className="provider-name">
                                            <b>{news.source.name}</b>
                                        </Text>
                                        <Text className="provider-name">{news.author}</Text>
                                    </VStack>
                                    <Text fontSize={"sm"} color={"gray"}>
                                        {/* @ts-ignore */}
                                        {formatDate(news.publishedAt)}
                                    </Text>
                                </VStack>
                                <Spacer />
                                <LinkChakra href={news.url} isExternal color={"#0063d1"}>
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
