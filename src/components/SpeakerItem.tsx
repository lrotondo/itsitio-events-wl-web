import {
    Avatar,
    Heading,
    Text,
    useDisclosure,
    VStack,
    Button,
    Box,
} from "@chakra-ui/react";
import { EventSpeaker } from "../api/types";
import SpeakerModal from "./SpeakerModal";

interface Props {
    speaker: EventSpeaker;
    width?: string;
}

const SpeakerItem = ({ speaker, width }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack alignItems={"center"} spacing={"35px"} w={width}>
            <Box pos="relative">
                <Avatar
                    src={speaker.speaker.picture}
                    name={speaker.speaker.name}
                    boxSize={"13rem"}
                    bgColor={"white"}
                    borderWidth={1}
                    borderColor={"lightgray"}
                    cursor={"pointer"}
                    onClick={onOpen}
                />
                <Button
                    pos="absolute"
                    bottom={0}
                    left={"50%"}
                    transform="auto"
                    translateX="-50%"
                    translateY={"50%"}
                    colorScheme="blue"
                    onClick={onOpen}
                    cursor="pointer"
                    rounded="xl"
                >
                    Ver Bio
                </Button>
            </Box>
            <SpeakerModal
                isOpen={isOpen}
                onClose={onClose}
                speaker={speaker.speaker}
            />
            <VStack>
                <Heading fontSize={"2xl"} textAlign={"center"}>
                    {speaker.speaker.name}
                </Heading>
                <Text color={"gray"} textAlign={"center"}>
                    {speaker.speaker.description}
                </Text>
            </VStack>
        </VStack>
    );
};

export default SpeakerItem;
