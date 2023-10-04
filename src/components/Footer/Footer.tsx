import { Divider, Text, VStack } from "@chakra-ui/react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <VStack className="footer-wrapper" marginTop={"20px"}>
            <Divider />
            <Text fontSize="md" color={"gray"}>
                ©{year} Pavel Kazlou - CryptoWave All Rights Reserved.
            </Text>
        </VStack>
    );
};

export default Footer;
