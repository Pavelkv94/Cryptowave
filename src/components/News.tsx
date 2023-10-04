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
import moment from "moment";
import { Link as LinkChakra } from "@chakra-ui/react";
import { CoinType } from "./Homepage/Homepage";

const demoImage = "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

type NewsPropsType = {
    simplified?: boolean;
};

interface ImageObject {
    _type: string;
    thumbnail: {
      _type: string;
      contentUrl: string;
      width: number;
      height: number;
    };
  }
  
  interface Thing {
    _type: string;
    readLink?: string;
    name: string;
  }
  
  interface Organization {
    _type: string;
    name: string;
    image?: ImageObject;
  }
  
  interface VideoObject {
    _type: string;
    name: string;
    thumbnailUrl: string;
    thumbnail?: ImageObject;
    width: number;
    height: number;
  }
  
  interface NewsArticle {
    _type: string;
    name: string;
    url: string;
    image?: ImageObject;
    description: string;
    about?: Thing[];
    mentions?: Thing[];
    provider: Organization[];
    datePublished: string;
    video?: VideoObject;
    category?: string;
  }


const News = ({ simplified }: NewsPropsType) => {
    const [newsCategory, setNewsCategory] = useState<React.ChangeEvent<HTMLSelectElement> | string>("Cryptocurrency");
    const { data } = useGetCryptosQuery(100);
    const { data: cryptoNews } = useGetCryptosNewsQuery({ newsCategory, count: simplified ? 6 : 21 });

    if (!cryptoNews?.value)
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
            {!simplified && <Center margin={"40px 0"}>
                <Heading>Latest Crypto News</Heading>
            </Center>}
            {!simplified && (
                <HStack marginBottom={"40px"}>
                    <Text fontSize={"md"}>Select news category: </Text>
                    <Select
                        w="300px"
                        defaultValue={"Cryptocurency"}
                        onChange={(e) => setNewsCategory(e.target.value)}
                    >
                        <option value="Cryptocurency">Cryptocurrency</option>
                        {data?.data?.coins?.map((currency: CoinType, i:number) => (
                            <option key={i} value={currency.name}>
                                {currency.name}
                            </option>
                        ))}
                    </Select>
                </HStack>
            )}

            <SimpleGrid columns={3} spacing={10} display={"flex"} flexWrap={"wrap"}>
                {cryptoNews.value.map((news: NewsArticle, i: number) => (
                    <Card key={i} direction={{ base: "column" }} overflow="hidden" variant="outline" minW="350px" maxW="370px">
                        <HStack padding={"20px 20px 0 20px"}>
                            <Image
                                objectFit="contain"
                                maxW={{ base: "40%", sm: "200px" }}
                                src={news?.image?.thumbnail?.contentUrl || demoImage}
                                alt="Caffe Latte"
                            />
                            <Heading size="md">{news.name}</Heading>
                        </HStack>
                        <CardBody paddingBottom={"0"}>
                            <Text py="2">{news.description.length > 100 ? `${news.description.substring(0, 200)}...` : news.description}</Text>
                        </CardBody>

                        <CardFooter>
                            <HStack w="100%">
                                <VStack alignItems={"flex-start"}>
                                    <HStack>
                                        <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                                        <Text className="provider-name">{news.provider[0]?.name}</Text>
                                    </HStack>
                                    <Text fontSize={"sm"} color={"gray"}>
                                        {/* @ts-ignore */}
                                        {moment(news.datePublished).startOf("ss").fromNow()}
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
