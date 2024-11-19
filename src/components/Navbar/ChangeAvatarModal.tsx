import {
    Avatar,
    Button,
    HStack,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Wrap,
    WrapItem
} from "@chakra-ui/react";
import { useState } from "react";
import { useAppSelector } from "../../store/store";
import { useUpdateAvatarMutation } from "../../store/api/authApi";

type PropsType = {
    isOpen: boolean
    onClose: () => void
}
const ChangeAvatarModal = ({ isOpen, onClose }: PropsType) => {
    const user = useAppSelector((state) => state.user.userData);
    const [currentAvatar, setCurrentAvatar] = useState(user?.avatar_url || "");

    const [update] = useUpdateAvatarMutation();

    const avatars = [
        "https://s3.coinmarketcap.com/static/img/portraits/61b9ab0bf5f0fa566713befc.png",
        "https://s3.coinmarketcap.com/static/img/portraits/633520129b613d3454890380.png",
        "https://s3.coinmarketcap.com/static/img/portraits/61b9ab0112c2c70880d53862.png",
        "https://s3.coinmarketcap.com/static/img/portraits/61b9aaf1e0de0c0544f5c449.png",
        "https://s3.coinmarketcap.com/static/img/portraits/61b9aae13dc73b45c63adb64.png",
        "https://s3.coinmarketcap.com/static/img/portraits/61b9aaca1d79d0637758fdeb.png",
        "https://s3.coinmarketcap.com/static/img/portraits/6135b24d951ca44aa49c8e7d.png",
        "https://s3.coinmarketcap.com/static/img/portraits/6135b23411c68f27796aecda.png",
        "https://s3.coinmarketcap.com/static/img/portraits/6135b2142e7df555d9eadb5a.png",
        "https://s3.coinmarketcap.com/static/img/portraits/613595981665312cbd880738.png",
        "https://s3.coinmarketcap.com/static/img/portraits/6135958aa6685729b784ea33.png",
        "https://s3.coinmarketcap.com/static/img/portraits/6135964a41177354c358ccb4.png",
        "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Panda-512.png",
        "https://w7.pngwing.com/pngs/867/134/png-transparent-giant-panda-dog-cat-avatar-fox-animal-tag-mammal-animals-carnivoran-thumbnail.png",
        "https://cdn1.iconfinder.com/data/icons/animal-avatars-1/60/Sloth-animals-nature-wildlife-animal-avatars-512.png",
        "https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Penguin-512.png",
        "https://cdn.icon-icons.com/icons2/1736/PNG/512/4043273-animal-avatar-mutton-sheep_113242.png"
    ];

    const updateAvatar = (url:string) => () => {
        update({ avatar_url: url, user_id: user ? user.id : "" }).then(() => {
            onClose();
        })
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>New Avatar</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <HStack alignItems={"flex-start"} marginBottom={4}>
                        <Avatar src={currentAvatar} size="xl" />
                        <Heading>{user?.email}</Heading>
                    </HStack>
                    <Text marginBottom={4} color={"gray"}>
                        Here you can choose new avatar:
                    </Text>
                    <Wrap>
                        {avatars.map((el, i) => (
                            <WrapItem key={i}>
                                <Avatar src={el} cursor={"pointer"} onClick={() => setCurrentAvatar(el)} />
                            </WrapItem>
                        ))}
                    </Wrap>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose} marginRight={4}>
                        Close
                    </Button>

                    <Button colorScheme="blue" onClick={updateAvatar(currentAvatar)}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ChangeAvatarModal;
