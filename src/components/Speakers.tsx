import { EventSpeaker } from "../api/types";
import { Heading, HStack, useBreakpointValue, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { PrimaryColorContext } from "../utils/context";
import SpeakersCarousel from "./SpeakersCarousel";
import SpeakerItem from "./SpeakerItem";

interface Props {
    speakers: EventSpeaker[];
}

const Speakers = ({ speakers }: Props) => {
    const primaryColor = useContext(PrimaryColorContext);
    const countdownComponent = document.getElementById("countdown");
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <VStack
            w={"full"}
            h={"fit-content"}
            justifyContent={"center"}
            spacing={8}
            id="speakers"
            py={12}
            mt={8}
        >
            <Heading
                color={primaryColor}
                mt={
                    countdownComponent
                        ? `${countdownComponent.clientHeight / 2}px`
                        : 0
                }
            >
                Oradores
            </Heading>
            {speakers.length >= 5 || isMobile ? (
                <SpeakersCarousel speakers={speakers} />
            ) : (
                <HStack
                    w={"80%"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    spacing={speakers.length < 4 ? 10 : 5}
                >
                    {speakers.map((speaker) => (
                        <SpeakerItem
                            width="fit-content"
                            key={speaker.id}
                            speaker={speaker}
                        />
                    ))}
                </HStack>
            )}
        </VStack>
    );
};

export default Speakers;
