import { Box, Center, Hide, HStack, IconButton } from "@chakra-ui/react";
import useEmblaCarousel from "embla-carousel-react";
import { useContext } from "react";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { EventModerator } from "../api/types";
import { PrimaryColorContext } from "../utils/context";
import ModeratorItem from "./ModeratorItem";

interface Props {
    moderators: EventModerator[];
}

const ModeratorsCarousel = ({ moderators }: Props) => {
    const primaryColor = useContext(PrimaryColorContext);
    const [emblaRef, embla] = useEmblaCarousel({
        loop: true,
        align: "center",
        draggable: true,
        slidesToScroll: 1,
    });
console.log("moderators", moderators.length);
    return (   
        <>
        {
            moderators.length > 0 &&
            <HStack w={"full"} justifyContent={"center"}>
            <Hide below="md">
                <IconButton
                    icon={<MdNavigateBefore size={30} />}
                    aria-label={"Moderador anterior"}
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
                    {moderators.map((moderator) => (
                        <Center
                            key={moderator.id}
                            position={"relative"}
                            flexGrow={0}
                            flexShrink={0}
                            flexBasis={{ base: "70%", md: "33%" }}
                        >
                            <ModeratorItem key={moderator.id} moderator={moderator} />
                        </Center>
                    ))}
                </HStack>
            </Box>
            <Hide below="md">
                {moderators.length > 3 && (
                    <IconButton
                        icon={<MdNavigateNext size={30} />}
                        aria-label={"Siguiente Moderador"}
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
        }        
        </>            
        );     
};

export default ModeratorsCarousel;
