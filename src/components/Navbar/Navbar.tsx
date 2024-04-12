import "./Navbar.scss";
import logo from "../../images/CryptoWave1.svg";
import { Avatar, Button, Center, HStack, Image, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";
import ChangeAvatarModal from "./ChangeAvatarModal";
import { useAppSelector } from "../../store/store";
import { useActions } from "../../hooks/useActions";
import { useGetUserQuery } from "../../store/api/authApi";

const Navbar = () => {
    const { pathname } = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { logoutUser } = useActions();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.userData?.user);
    const authStatus = useAppSelector((state) => state.user);

    const isActiveButton = (path: string) => (pathname === path ? "active" : "");

    const { data: userData } = useGetUserQuery(user?.id, {skip: !user});

    const logout = () => {
        logoutUser();
        navigate("/");
    };

    return (
        <div className="navbar-wrapper">
            <HStack spacing="24px" w="100%" h="100%" className="navbar-content">
                <Image src={logo} height={50} className="logo" />
                <Spacer />
                <HStack className="menu-wrapper" h={"100%"} w={"600px"}>
                    <Link to={"/"}>
                        <Center w={"140px"} h={"60px"} color={"white"} className={`navbar-btn ${isActiveButton("/")}`}>
                            <Text fontSize="xl">Home</Text>
                        </Center>
                    </Link>
                    <Spacer />
                    <Link to={"/cryptocurrencies"}>
                        <Center w={"140px"} h={"60px"} color={"white"} className={`navbar-btn ${isActiveButton("/cryptocurrencies")}`}>
                            <Text fontSize="xl">Currencies</Text>
                        </Center>
                    </Link>
                    <Spacer />
                    <Link to={"/exchanges"}>
                        <Center w={"140px"} h={"60px"} color={"white"} className={`navbar-btn ${isActiveButton("/exchanges")}`}>
                            <Text fontSize="xl">Exchanges</Text>
                        </Center>
                    </Link>
                    <Spacer />
                    <Link to={"/news"}>
                        <Center w={"140px"} h={"60px"} color={"white"} className={`navbar-btn ${isActiveButton("/news")}`}>
                            <Text fontSize="xl">News</Text>
                        </Center>
                    </Link>
                </HStack>
                <Spacer />
                {authStatus.isLoading ? (
                    <div style={{ width: "350px", color: "white" }}>Loading</div>
                ) : authStatus.isAuth ? (
                    <HStack className="menu-additional-wrapper" spacing={"14px"}>
                        <Avatar src={userData} cursor={"pointer"} onClick={onOpen} />
                        <NavLink to={"/portfolio"}>
                            <Button colorScheme="messenger" variant="solid">
                                Portfolio
                            </Button>
                        </NavLink>
                        <Button colorScheme="teal" variant="solid" onClick={logout}>
                            Logout
                        </Button>
                    </HStack>
                ) : (
                    <HStack className="menu-additional-wrapper" spacing={"14px"}>
                        <AuthModal mode="Login" />
                        <AuthModal mode="Registration" />
                    </HStack>
                )}
            </HStack>
            {isOpen && <ChangeAvatarModal isOpen={isOpen} onClose={onClose}/>}
        </div>
    );
};

export default Navbar;
