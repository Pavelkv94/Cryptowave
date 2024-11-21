import {
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLoginMutation, useRegistrationMutation } from "../../store/api/authApi";
import { IUserLogin } from "../../types/user.types";

type AuthModalPropsType = {
    mode: "Login" | "Registration";
};

const AuthModal = ({ mode }: AuthModalPropsType) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const initData: IUserLogin = {
        email: "",
        password: "",
        tg_nickname: ""
    };

    const [data, setData] = useState<IUserLogin>(initData);
    const [show, setShow] = useState(false);
    const [register, { error: registrationError, isSuccess: registrationSuccess }] = useRegistrationMutation();
    const [login, { error: loginError }] = useLoginMutation();

    const handleClick = () => setShow(!show);

    const closeModal = () => {
        onClose();
        setData(initData);
    };

    const handleRegistration = (payload: IUserLogin) => {
        register(payload).then(() => closeModal());
    };

    const handleLogin = async (payload: IUserLogin) => {
        await login(payload)
            .unwrap()
            .finally(() => onClose());
    };

    useEffect(() => {
        registrationError &&
            toast({
                title: "Error.",
                description: `An error occurred during registration. ${registrationError.data.errorsMessages.map(
                    (error: { field: string; message: string }) => `${error.field} - ${error.message}`
                )}`,
                status: "error",
                duration: 9000,
                isClosable: true
            });
        registrationSuccess &&
            toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 9000,
                isClosable: true
            });
        loginError &&
            toast({
                title: "Error.",
                description: "An error occurred during login." + (loginError.data.message ? loginError.data.message : ""),
                status: "error",
                duration: 9000,
                isClosable: true
            });
    }, [registrationError, registrationSuccess, toast, loginError]);

    const handleSubmit = () => {
        mode === "Login" ? handleLogin({ email: data.email, password: data.password }) : handleRegistration(data);
    };

    return (
        <>
            <Button colorScheme="messenger" variant="solid" onClick={onOpen}>
                {mode}
            </Button>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{mode}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} placeholder="Enter Email" marginBottom={5} />
                        {mode === "Registration" && (
                            <Input
                                value={data.tg_nickname}
                                onChange={(e) => setData({ ...data, tg_nickname: e.target.value })}
                                placeholder="Enter Telegram Nickname"
                                marginBottom={5}
                            />
                        )}
                        <InputGroup size="md">
                            <Input
                                pr="4.5rem"
                                type={show ? "text" : "password"}
                                placeholder="Enter password"
                                value={data.password}
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={closeModal}>
                            Close
                        </Button>
                        <Button colorScheme="blue" isDisabled={data.email.trim() === "" || data.password.trim() === ""} onClick={handleSubmit}>
                            {mode}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AuthModal;
