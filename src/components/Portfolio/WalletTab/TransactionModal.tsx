import {
    Button,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text,
    Textarea,
    VStack,
    useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { formatDateToISOString } from "../../../utils/fotmerDate";
import { useTransactionMutation } from "../../../store/api/serverApi";
import { useAppSelector } from "../../../store/store";
import { Icoin } from "../../../types/coins.types";

type PropsType = {
    coins?: Icoin[];
};

type InitTransactionType = {
    perCoin: string | number;
    selectedCoin: string;
    quantity: number;
    note: string;
    date: string;
};
const TransactionModal = ({ coins }: PropsType) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useAppSelector((state) => state.user.userData?.user);

    const [register] = useTransactionMutation();

    const currentDate = new Date();

    const initTransactionBody = {
        perCoin: "0",
        selectedCoin: "Bitcoin",
        quantity: 0,
        note: "",
        date: formatDateToISOString(currentDate)
    };

    const [transactionBody, setTransactionBody] = useState<InitTransactionType>(initTransactionBody);

    const handleInput = (field: string) => (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => setTransactionBody({ ...transactionBody, [field]: e.currentTarget.value });
    const format = (val: number) => `$` + val;
    const parse = (val: string) => val.replace(/^\$/, "");

    useEffect(() => {
        coins &&
            setTransactionBody({
                ...transactionBody,
                selectedCoin: coins[0].name,
                perCoin: (+coins[0].price).toFixed(2).toString()
            });
    }, [coins]);

    useEffect(() => {
        const selectedCoin = coins?.find((el: Icoin) => el.name === transactionBody.selectedCoin);
        setTransactionBody({ ...transactionBody, perCoin: selectedCoin ? (+selectedCoin.price).toFixed(2).toString() : ""});
    }, [transactionBody.selectedCoin]);

    const selectOptions = coins?.map((el: Icoin, i: number) => (
        <option key={i} value={el.name}>
            {el.name} ({el.symbol})
        </option>
    ));

    const handleClose = () => {
        onClose();
        setTransactionBody(initTransactionBody);
    };

    const handleSubmitTransaction = (operation: string) => () => {
        register({
            user_id: user?.id,
            coin: transactionBody.selectedCoin,
            quantity: transactionBody.quantity,
            price_per_coin: transactionBody.perCoin,
            note: transactionBody.note,
            total: (+transactionBody.quantity * +transactionBody.perCoin).toFixed(2),
            operation: operation,
            date: transactionBody.date,
            tg_nickname: user?.tg_nickname
        }).then(() => {
            handleClose();
        });
    };

    return (
        <>
            <Button variant={"solid"} colorScheme="linkedin" onClick={onOpen}>
                + Add transaction
            </Button>

            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Transaction</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Select value={transactionBody.selectedCoin} onChange={handleInput("selectedCoin")}>
                            {selectOptions}
                        </Select>
                        <HStack marginTop={4}>
                            <VStack align={"start"}>
                                <Text margin={0}>Quantity</Text>
                                <NumberInput
                                    precision={2}
                                    value={transactionBody.quantity}
                                    onChange={(value) => setTransactionBody({ ...transactionBody, quantity: +value })}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </VStack>
                            <VStack align={"start"}>
                                <Text margin={0}>Price Per Coin</Text>
                                <NumberInput
                                    precision={2}
                                    onChange={(value) => setTransactionBody({ ...transactionBody, perCoin: +parse(value) })}
                                    value={format(+transactionBody.perCoin)}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </VStack>
                        </HStack>
                        <Input
                            type="datetime-local"
                            marginTop={5}
                            value={transactionBody.date}
                            onChange={(e) => setTransactionBody({ ...transactionBody, date: e.target.value })}
                        />
                        <VStack align={"start"} marginTop={4}>
                            <Text margin={0}>Note</Text>
                            <Textarea placeholder="Enter the note" value={transactionBody.note} onChange={handleInput("note")} />
                        </VStack>
                        <VStack height={20} marginTop={4} borderRadius={5} backgroundColor={"rgb(239, 242, 245)"} align={"start"} padding={2}>
                            <Text margin={0} fontSize={14} color={"gray"}>
                                Total
                            </Text>
                            <Text margin={0} fontSize={24} fontWeight={"bold"}>
                                ${(+transactionBody.quantity * +transactionBody.perCoin).toFixed(2)}
                            </Text>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={handleClose} marginRight={4}>
                            Close
                        </Button>
                        <Button colorScheme="blue" marginRight={4} onClick={handleSubmitTransaction("buy")} isDisabled={transactionBody.quantity === 0}>
                            Buy
                        </Button>
                        <Button colorScheme="blue" onClick={handleSubmitTransaction("sell")} isDisabled={transactionBody.quantity === 0}>
                            Sell
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default TransactionModal;
