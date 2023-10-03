import { Box, Center, HStack, Heading, Image, Spacer, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import "./Homepage.scss";
import banner from "../../images/main-banner.png";
import { useLocation } from "react-router-dom";
import { useGetCryptosQuery } from "../../services/cryptoApi";
const Homepage = () => {
    const {pathname} = useLocation()

  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;
  console.log(data);
  if (isFetching) return "loading";


    return (
        <Box>
            <Box bg={"rgba(55, 114, 255, 0.1);"}>
                <HStack h={"587px"} maxW={"1400px"} margin={"0 auto"} flexWrap={"wrap"} display={"flex"} justifyContent={"space-between"}>
                    <VStack alignItems={"flex-start"} spacing={"20px"}>
                    <Heading as="h1" size={"3xl"} maxW={"500px"} color={"#23262F"}>Today’s Cryptocurrency prices</Heading>
                        <Text fontSize={"2xl"} color={"#777E90"}>The global crypto market cap is $1.86T</Text>
                    </VStack>
                    <Image src={banner} />
                </HStack>
            </Box>
            Home
        </Box>
    );
};

export default Homepage;
