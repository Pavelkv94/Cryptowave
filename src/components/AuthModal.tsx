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
import { useRegistrationMutation } from "../services/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/userSlice";

type AuthModalPropsType = {
    mode: "Login" | "Registration";
    login?: any
    loginError?: any
};

type UserDataType = {
    username: string;
    password: string;
    tg_nickname?: string;
};

const AuthModal = ({ mode, login, loginError }: AuthModalPropsType) => {
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const initData: UserDataType = {
        username: "",
        password: "",
        tg_nickname: ""
    };

    const [data, setData] = useState<UserDataType>(initData);
    const [show, setShow] = useState(false);
    const [register, { error: registrationError, isSuccess: registrationSuccess }] = useRegistrationMutation();

    const handleClick = () => setShow(!show);

    const closeModal = () => {
        onClose();
        setData(initData);
    };

    const handleRegistration = (payload: UserDataType) => {
        register(payload).then(() => closeModal());
    };

    const handleLogin = (payload: UserDataType) => {
        login(payload).then((res: any) => {
            if(res.error) {
                closeModal();
                console.log("error")

            } else {
                dispatch(setUser(res));
                localStorage.setItem("user", JSON.stringify(res.data))
                closeModal();
                location.reload()
                console.log(res)
                console.log("good")

            }
           
        });
    };

    useEffect(() => {
        registrationError &&
            toast({
                title: "Error.",
                description: "An error occurred during registration.",
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
                description: "An error occurred during login.",
                status: "error",
                duration: 9000,
                isClosable: true
            });
    }, [registrationError, registrationSuccess, loginError]);

    const handleSubmit = () => {
        mode === "Login" ? handleLogin({ username: data.username, password: data.password }) : handleRegistration(data);
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
                        <Input
                            value={data.username}
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                            placeholder="Enter login"
                            marginBottom={5}
                        />
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
                        <Button
                            colorScheme="blue"
                            isDisabled={data.username.trim() === "" || data.password.trim() === ""}
                            onClick={handleSubmit}
                        >
                            {mode}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AuthModal;
