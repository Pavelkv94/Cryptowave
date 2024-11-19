import { Box, Card, CardBody, CardFooter, Center, HStack, Heading, Image, SimpleGrid, Skeleton, Spacer, Stack, Text, VStack } from "@chakra-ui/react";
import { Link as LinkChakra } from "@chakra-ui/react";
import { useGetCryptosNewsQuery } from "../../store/api/cryptoNewsApi";
import { INewsArticle } from "../../types/coins.types";

const demoImage = "https://www.pallenz.co.nz/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";

type NewsPropsType = {
    simplified?: boolean;
};

const News = ({ simplified }: NewsPropsType) => {
    // const [newsCategory, setNewsCategory] = useState<string>("Cryptocurrency");
    const { data: cryptoNews, isLoading, isError } = useGetCryptosNewsQuery({ newsCategory: "Cryptocurrency", count: simplified ? 6 : 21 });
    const news: INewsArticle[] | undefined = cryptoNews && (simplified ? cryptoNews.articles.slice(0, 12) : cryptoNews.articles);

    const formatDate = (timestamp: number | string) => {
        const oldDate = new Date(timestamp);
        const now = Date.now();
        const differenceInSeconds = Math.floor((now - +oldDate) / 1000);

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

    if (isLoading)
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

    if (isError)
        return (
            <Stack maxW="1200px" margin="100px auto">
                <Skeleton height="80px" />
                <Skeleton height="80px" />
                <Skeleton height="80px" />
                <h1>Sorry, News Api unavailable now. :(</h1>
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
            {/* {!simplified && (
                <HStack marginBottom={"40px"}>
                    <Text fontSize={"md"}>Select news category: </Text>
                    <Select w="300px" defaultValue={"Cryptocurency"} onChange={(e) => setNewsCategory(e.target.value)}>
                        <option value="Cryptocurency">Cryptocurrency</option>
                        {data?.coins?.map((currency: Icoin, i: number) => (
                            <option key={i} value={currency.name}>
                                {currency.name}
                            </option>
                        ))}
                    </Select>
                </HStack>
            )} */}

            <SimpleGrid columns={3} spacing={10} display={"flex"} flexWrap={"wrap"}>
                {news &&
                    news.map((news: INewsArticle, i: number) => {
                        return (
                            <Card key={i} direction={{ base: "column" }} overflow="hidden" variant="outline" minW="350px" maxW="370px">
                                <HStack padding={"20px 20px 0 20px"}>
                                    <Image
                                        objectFit="contain"
                                        maxW={{ base: "40%", sm: "100%" }}
                                        height={220}
                                        src={news.urlToImage ? news?.urlToImage.replace(/\?.*$/, "") : demoImage}
                                        alt="Caffe Latte"
                                    />
                                </HStack>
                                <Heading padding={"20px 20px 0 20px"} size="md">
                                    {news.title}
                                </Heading>
                                <CardBody paddingBottom={"0"}>
                                    <Text py="2">
                                        {news.description && news.description.length > 100 ? `${news.description?.substring(0, 200)}...` : news.description}
                                    </Text>
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
                        );
                    })}
            </SimpleGrid>
        </Box>
    );
};

export default News;
