import {
    Heading,
    Text,
    VStack,
    Box,
    Flex,
    Center,
    Spinner,
    chakra,
    Button,
} from "@chakra-ui/react";
import { Event } from "../api/types";
import CountdownComponent from "./CountdownComponent";
import { useContext, useRef } from "react";
import { useIsVideoLoaded } from "../hooks/useIsVideoLoaded";
import { PrimaryColorContext } from "../utils/context";
import { Link } from "@chakra-ui/react";
import useWindowSize from "../hooks/useWindowsSize";

interface Props {
    event: Event;
}

const Info = ({ event }: Props) => {
    const primaryColor = useContext(PrimaryColorContext);
    const videoRef = useRef(null);
    const videoLoaded = useIsVideoLoaded(videoRef);
    const countdownRef = useRef<HTMLDivElement>(null);
    const size = useWindowSize();

    return (
        <Box
            // workaround for re-rendering component on each window resize
            key={size.toString()}
            w={"full"}
            h={`calc(100% - ${
                countdownRef.current
                    ? countdownRef.current?.clientHeight / 2
                    : 0
            }px)`}
            id={"info"}
            pos={"relative"}
            bgImage={event.isImage ? event.banner : undefined}
            bgPos={"center center"}
            bgRepeat={"no-repeat"}
            bgSize={"cover"}
        >
            {!event.isImage && (
                <chakra.video
                    id="background-video"
                    loop
                    autoPlay
                    pos={"absolute"}
                    right={0}
                    bottom={0}
                    minW={"full"}
                    minH={"full"}
                    muted
                    ref={videoRef}
                    objectFit={"cover"}
                >
                    <source src={event.banner} type="video/mp4" />
                </chakra.video>
            )}
            {!event.isImage && !videoLoaded && (
                <Center
                    w={"full"}
                    h={"full"}
                    pos={"absolute"}
                    top={0}
                    left={0}
                    zIndex={1}
                >
                    <Spinner zIndex={1} size={"xl"} color={"steelblue"} />
                </Center>
            )}
            <Flex
                w={"full"}
                h={"full"}
                p={[5, 20]}
                alignItems={"flex-start"}
                css={{
                    "& > *": {
                        zIndex: 10,
                    },
                }}
            >
                <VStack alignItems={"flex-start"} spacing={5}>
                    <Heading
                        fontSize={"xl"}
                        color={event.primaryColor}
                        textTransform={"uppercase"}
                    >
                        {event.subtitle}
                    </Heading>
                    <Text color="white" fontSize={"5xl"} fontWeight={"bold"}>
                        {event.title}
                    </Text>
                    <Text color="white">{event.description}</Text>
                    <Button
                        as={Link}
                        href={event.isPast ? "#stream" : "#inscriptions"}
                        colorScheme={"facebook"}
                        bgColor={primaryColor}
                        fontWeight={"normal"}
                        px={10}
                        textDecor="none !important"
                        size={"lg"}
                        fontSize="xl"
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById(
                                event.isPast ? "stream" : "inscriptions"
                            );

                            if (element) {
                                element.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }
                        }}
                    >
                        {event.isPast
                            ? `Ver ${event.live ? "en vivo" : "grabación"}`
                            : "¡Me quiero inscribir!"}
                    </Button>
                </VStack>
            </Flex>
            {!event.isPast && (
                <Box
                    pos={"absolute"}
                    top={"100%"}
                    left={"50%"}
                    transform={"translate(-50%, -50%)"}
                    zIndex={10}
                    ref={countdownRef}
                >
                    <CountdownComponent dateUTC={event.dateUTC} />
                </Box>
            )}
        </Box>
    );
};
export default Info;
