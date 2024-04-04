import {
    Avatar,
    Heading,
    Text,
    useDisclosure,
    VStack,
    Button,
    Box,
} from "@chakra-ui/react";
import { EventModerator } from "../api/types";
import ModeratorModal from "./ModeratorModal";

interface Props {
    moderator: EventModerator;
    width?: string;
}

const ModeratorItem = ({ moderator, width }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack alignItems={"center"} spacing={"35px"} w={width}>
            <Box pos="relative">
                <Avatar
                    src={moderator.moderator.picture}
                    name={moderator.moderator.name}
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
            <ModeratorModal
                isOpen={isOpen}
                onClose={onClose}
                moderator={moderator.moderator}
            />
            <VStack>
                <Heading fontSize={"2xl"} textAlign={"center"}>
                    {moderator.moderator.name}
                </Heading>
                <Text color={"gray"} textAlign={"center"}>
                    {moderator.moderator.description}
                </Text>
            </VStack>
        </VStack>
    );
};

export default ModeratorItem;
