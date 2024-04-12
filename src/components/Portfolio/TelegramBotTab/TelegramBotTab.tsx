import {
    Text,
    Button,
    TabPanel,
    Card,
    HStack,
    Avatar,
    Heading,
    VStack,
    Icon,
    createIcon,
    Link,
    Table,
    TableContainer,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Select,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    useToast,
    Image,
    IconButton,
    Skeleton,
    Stack
} from "@chakra-ui/react";
import tgBotLogo from "../.././../assets/tg-bot-logo.jpg";
import { useEffect, useState } from "react";
import millify from "millify";
import SmallChart from "../../Homepage/SmallChart";
import { Link as LinkReact } from "react-router-dom";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAddWatchitemMutation, useDeleteWatchItemMutation, useGetWatchListQuery } from "../../../store/api/serverApi";
import { useGetCryptosQuery } from "../../../store/api/cryptoApi";
import { useAppSelector } from "../../../store/store";
import { IWatchItem, Icoin } from "../../../types/coins.types";
const TelegramBotTab = () => {
    const user = useAppSelector((state) => state.user.userData?.user);

    const { data: cryptosList, isSuccess } = useGetCryptosQuery(100);
    const { data: watchList, isFetching } = useGetWatchListQuery(user?.id || "", {skip: !user});
    const [addItem] = useAddWatchitemMutation();
    const [deleteItem] = useDeleteWatchItemMutation();

    const toast = useToast();

    const TgIcon = createIcon({
        displayName: "TgIcon",
        viewBox: "0 0 48 48",
        path: (
            <path
                d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z"
                fill="#FFFFFF"
            />
        )
    });

    const [changing, setChanging] = useState(20);
    const [selectedCoinName, setSelectedCoinName] = useState("");
    const [selectedCoin, setSelectedCoin] = useState<Icoin | null>(null);

    useEffect(() => {
        isSuccess && setSelectedCoinName(cryptosList?.data?.coins[0].name);
    }, [isSuccess]);

    useEffect(() => {
        if (selectedCoinName) {
            setSelectedCoin(cryptosList?.data?.coins?.find((el: Icoin) => el.name === selectedCoinName) || null);
        }
    }, [selectedCoinName]);

    const handleChangeSlider = (newValue: number) => {
        setChanging(newValue);
    };

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
        setSelectedCoinName(e.target.value);
    };

    const selectOptions = cryptosList?.data?.coins?.map((el: Icoin, i: number) => (
        <option key={i} value={el.name}>
            {el.name} ({el.symbol})
        </option>
    ));

    const addWatchListItem = () => {
      if(watchList && watchList.find((el:IWatchItem) => el.name === selectedCoinName)) {
        toast({
          title: "Failed.",
          description: "This cryptocurrency is already in the Watch list.",
          status: "error",
          duration: 9000,
          isClosable: true
      })
      } else {
        addItem({
          symbol: selectedCoin?.symbol,
          name: selectedCoinName,
          iconUrl: selectedCoin?.iconUrl,
          tg_nickname: user?.tg_nickname,
          user_id: user?.id,
          changing: changing
      })
          .then(() => {
              toast({
                  title: "Success.",
                  description: "Cryptocurrency added to your Watch List.",
                  status: "success",
                  duration: 9000,
                  isClosable: true
              });
          })
          .catch(() =>
              toast({
                  title: "Error.",
                  description: "An error occurred.",
                  status: "error",
                  duration: 9000,
                  isClosable: true
              })
          );
      }
        
    };

    const deleteWatchListItem = (item_id: string) => () => {
        deleteItem(item_id)
    };

    return (
        <TabPanel>
            <Card maxW={"1100px"} padding={4}>
                <HStack justifyContent={"space-between"}>
                    <Text maxW={"550px"}>
                        Here are the telegram bot settings.
                        <br /> It can notify you about changes in the value of selected cryptocurrencies for the last 24h, as well as about your current balance.
                        <br /> CryptoWave_bot updates cryptocurrency status every <b>12h</b>.
                    </Text>
                    <VStack align={"end"}>
                        <HStack>
                            <Avatar src={tgBotLogo} />
                            <Heading size={"lg"}>CryptoWave_bot</Heading>
                        </HStack>
                        <Link href="https://t.me/Cryptowave_tg_bot" target="_blank">
                            <Button colorScheme="telegram">
                                <Icon marginRight={"2"}>
                                    <TgIcon />
                                </Icon>
                                Connect
                            </Button>
                        </Link>
                    </VStack>
                </HStack>
                <HStack justifyContent={"space-between"} marginTop={10}>
                    <VStack align={"start"}>
                        <Text fontWeight={"bold"}>Select cryptocurrensy for watching:</Text>
                        <Select w={400} value={selectedCoinName} onChange={handleChangeSelect}>
                            {selectOptions}
                        </Select>
                    </VStack>
                    <VStack justifyContent={"space-between"} align={"start"} w={400}>
                        <Text fontWeight={"bold"}>
                            Select tracked changes value:{" "}
                            <i style={{ color: "#D53F8C" }}>
                                {changing}% ({((parseFloat(selectedCoin?.price || "0") * changing) / 100).toFixed(3)}$)
                            </i>
                        </Text>
                        <Slider value={changing} onChange={handleChangeSlider} h={"40px"}>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb boxSize={6} />
                        </Slider>
                    </VStack>
                    <Button colorScheme="pink" onClick={addWatchListItem}>
                        Add to Watch list
                    </Button>
                </HStack>
            </Card>

            {isFetching ? (
                <Stack maxW="1200px" margin="50px auto">
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                    <Skeleton height="80px" />
                </Stack>
            ) : (
                <TableContainer marginTop={"20px"} maxW="1400px" margin="0 auto">
                    <Heading size="lg" margin={"20px 0"}>
                        Watch list
                    </Heading>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Price</Th>
                                <Th>24h, %</Th>
                                <Th>Volume(24h)</Th>
                                <Th>Last 24h</Th>
                                <Th>Tracked Change</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {watchList?.length === 0 ? (
                                <Tr>
                                    <Td>Your Watch list is empty.</Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                </Tr>
                            ) : (
                                watchList?.map((el:IWatchItem, i: number) => {
                                    const coin = cryptosList?.data?.coins?.find((item:Icoin) => item.name === el.name);
                                    const coinPrice = coin ? +coin.price : 0;

                                    return (
                                        <Tr key={i}>
                                            <Td>
                                                <LinkReact to={`/cryptocurrencies/${coin?.uuid}`}>
                                                    <HStack>
                                                        <Image src={coin?.iconUrl} w={"20px"} h={"20px"} />
                                                        <Text>
                                                            {coin?.name} ({coin?.symbol})
                                                        </Text>
                                                    </HStack>
                                                </LinkReact>
                                            </Td>
                                            <Td>${(coinPrice).toFixed(2)}</Td>
                                            <Td>${millify(coin ? +coin.marketCap : 0)}</Td>

                                            <Td color={(coin ? +coin.change : 0) < 0 ? "#d33535" : "rgb(88, 189, 125)"}>{coin?.change}%</Td>
                                            <Td>
                                                <SmallChart chartData={coin?.sparkline || []} increase={(coin ? +coin.change : 0) > 0} smallest />
                                            </Td>
                                            <Td>
                                                {el.changing}% ({((coinPrice * +el.changing) / 100).toFixed(3)}$)
                                            </Td>
                                            <Td>
                                                <IconButton
                                                    colorScheme="red"
                                                    aria-label="Delete watchlist item"
                                                    icon={<DeleteIcon />}
                                                    onClick={deleteWatchListItem(el._id)}
                                                />
                                            </Td>
                                        </Tr>
                                    );
                                })
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </TabPanel>
    );
};

export default TelegramBotTab;
