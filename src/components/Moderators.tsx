import { EventModerator } from "../api/types";
import { Heading, HStack, useBreakpointValue, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { PrimaryColorContext } from "../utils/context";
import ModeratorsCarousel from "./ModeratorsCarousel";
import ModeratorItem from "./ModeratorItem";

interface Props {
    moderators: EventModerator[];
}

const Moderators = ({ moderators }: Props) => {
    const primaryColor = useContext(PrimaryColorContext);
    const countdownComponent = document.getElementById("countdown");
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <VStack
            w={"full"}
            h={"fit-content"}
            justifyContent={"center"}
            spacing={8}
            id="moderators"
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
                Moderadores
            </Heading>
            {moderators.length >= 6 || isMobile ? (
                <ModeratorsCarousel moderators={moderators} />
            ) : (
                <HStack
                    w={"80%"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    spacing={moderators.length < 4 ? 10 : 5}
                >
                    {moderators.map((moderator) => (
                        <ModeratorItem
                            width="fit-content"
                            key={moderator.id}
                            moderator={moderator}
                        />
                    ))}
                </HStack>
            )}
        </VStack>
    );
};

export default Moderators;
