import { Box, Center, Hide, HStack, IconButton } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { useContext } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { EventSpeaker } from "../api/types";
import { PrimaryColorContext } from "../utils/context";
import SpeakerItem from "./SpeakerItem";

interface Props {
    speakers: EventSpeaker[];
}

const SpeakersCarousel = ({ speakers }: Props) => {
    const primaryColor = useContext(PrimaryColorContext);
    const [emblaRef, embla] = useEmblaCarousel({
        loop: true,
        align: "center",
        draggable: true,
        slidesToScroll: 1,
    });

    return (
        <HStack w={"full"} justifyContent={"center"}>
            <Hide below="md">
                <IconButton
                    icon={<MdNavigateBefore size={30} />}
                    aria-label={"Orador anterior"}
                    onClick={() => embla?.scrollPrev()}
                    variant={"ghost"}
                    size={"lg"}
                    rounded={"full"}
                    bgColor={primaryColor}
                    color={"white"}
                    _hover={{ bgColor: "lightgray" }}
                />
            </Hide>
            <Box
                w={{ base: "full", md: "90%", lg: "80%", xl: "65%" }}
                ref={emblaRef}
                overflow={"hidden"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"flex-start"}
            >
                <HStack spacing={0} w={"full"} alignItems={"flex-start"}>
                    {speakers.map((speaker) => (
                        <Center
                            key={speaker.id}
                            position={"relative"}
                            flexGrow={0}
                            flexShrink={0}
                            flexBasis={{ base: "70%", md: "33%" }}
                        >
                            <SpeakerItem key={speaker.id} speaker={speaker} />
                        </Center>
                    ))}
                </HStack>
            </Box>
            <Hide below="md">
                {speakers.length > 3 && (
                    <IconButton
                        icon={<MdNavigateNext size={30} />}
                        aria-label={"Siguiente orador"}
                        onClick={() => embla?.scrollNext()}
                        variant={"ghost"}
                        size={"lg"}
                        rounded={"full"}
                        bgColor={primaryColor}
                        color={"white"}
                        _hover={{ bgColor: "lightgray" }}
                    />
                )}
            </Hide>
        </HStack>
    );
};

export default SpeakersCarousel;
