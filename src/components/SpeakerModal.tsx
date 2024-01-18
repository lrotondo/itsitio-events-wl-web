import { Speaker } from "../api/types";
import {
    Img,
    Flex,
    VStack,
    Heading,
    Text,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useContext } from "react";
import { PrimaryColorContext } from "../utils/context";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    chakra,
} from "@chakra-ui/react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    speaker: Speaker;
}

const SpeakerModal = ({ isOpen, onClose, speaker }: Props) => {
    const primaryColor = useContext(PrimaryColorContext);
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            scrollBehavior="inside"
        >
            <ModalOverlay />
            <ModalContent minW="full" h="full" maxH="full">
                <ModalCloseButton />
                <ModalBody p={0} rounded={6}>
                    <Flex
                        w="full"
                        h="full"
                        justifyContent={{ base: "flex-start", md: "center" }}
                        alignItems="center"
                        gap={10}
                        px={{ base: 5, md: 20 }}
                        py={10}
                        flexDir={{ base: "column", md: "row" }}
                    >
                        {speaker.video ? (
                            <chakra.iframe
                                flex={{ base: undefined, md: 1 }}
                                height={{ base: "50%", md: "500" }}
                                w={{ base: "full", md: undefined }}
                                src={`https://www.youtube-nocookie.com/embed/${speaker.video}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                allowFullScreen
                            ></chakra.iframe>
                        ) : (
                            <Img
                                w={{ base: "full", md: "auto" }}
                                h={{ base: "auto", md: "500" }}
                                src={speaker.picture}
                                alt={speaker.name}
                                rounded={"lg"}
                            />
                        )}
                        <VStack
                            w={{ base: "full", md: undefined }}
                            flex={{ base: undefined, md: 1 }}
                            maxW={{ base: undefined, md: "50%" }}
                            h={{ base: "auto", md: "500" }}
                            justifyContent={"flex-start"}
                            spacing={5}
                            maxH={{ base: "50%", md: "none" }}
                            overflow="auto"
                        >
                            <VStack>
                                <Heading color={primaryColor}>
                                    {speaker.name}
                                </Heading>
                                <Text fontSize={"lg"} color="gray">
                                    {speaker.description}
                                </Text>
                            </VStack>
                            <Text fontSize={"md"}>{speaker.bio}</Text>
                        </VStack>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
export default SpeakerModal;
