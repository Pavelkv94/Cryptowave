import "./Navbar.scss";
import logo from "../../images/CryptoWave1.svg";
import { Avatar, Box, Button, Center, Divider, Flex, HStack, Icon, Image, LinkOverlay, Select, Spacer, Stack, Text } from "@chakra-ui/react";
import { TFunction } from "i18next";
import { BiSun } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

type NavbarPropsType = {
    t: TFunction;
};

const Navbar = ({ t }: NavbarPropsType) => {
  const {pathname} = useLocation()

  const isActiveButton = (path:string) => pathname === path ? "active" : "";

    return (
        <div className="navbar-wrapper">
            <HStack spacing="24px" w="100%" h="100%" className="navbar-content">
                <Image src={logo} height={50} />
                <Spacer />
                <HStack className="menu-wrapper" h={"100%"} w={"600px"}>
                    <Link to={"/"}>
                        <Center w={"140px"} h={"60px"} color={"white"} className={`navbar-btn ${isActiveButton("/")}`}>
                            <Text fontSize="xl">{t("home")}</Text>
                        </Center>
                    </Link>
                    <Spacer />
                    <Link to={"/cryptocurrencies"}>
                        <Center w={"140px"} h={"60px"} color={"white"} className={`navbar-btn ${isActiveButton("/cryptocurrencies")}`}>
                            <Text fontSize="xl">{t("currencies")}</Text>
                        </Center>
                    </Link>
                    <Spacer />
                    <Link to={"/exchanges"}>
                        <Center w={"140px"} h={"60px"} color={"white"} className={`navbar-btn ${isActiveButton("/exchanges")}`}>
                            <Text fontSize="xl">{t("exchanges")}</Text>
                        </Center>
                    </Link>
                    <Spacer />
                    <Link to={"/news"}>
                        <Center w={"140px"} h={"60px"} color={"white"} className={`navbar-btn ${isActiveButton("/news")}`}>
                            <Text fontSize="xl">{t("news")}</Text>
                        </Center>
                    </Link>
                </HStack>
                <Spacer />
                <HStack className="menu-additional-wrapper" spacing={"14px"}>
                    <Select variant="unstyled" w={"60px"} defaultValue={"RU"}>
                        <option value="RU">RU</option>
                        <option value="EN">EN</option>
                    </Select>
                    <HStack w="46px">
                        <Divider orientation="vertical" h={"30px"} />
                        <Icon as={BiSun} w={"26px"} h={"26px"} color="white" />
                        <Divider orientation="vertical" h={"30px"} />
                    </HStack>
                    <Button colorScheme="messenger" variant="solid">
                        {t("wallet")}
                    </Button>
                    <Avatar />
                </HStack>
            </HStack>
        </div>
    );
};

export default Navbar;
