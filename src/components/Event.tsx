import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { apiClient } from "../api/lib";
import { Event } from "../api/types";
import { PrimaryColorContext } from "../utils/context";
import Footer from "./Footer";
import Info from "./Info";
import Inscriptions from "./Inscriptions";
import LoadingOverlay from "./LoadingOverlay";
import Navbar from "./Navbar";
import Speakers from "./Speakers";
import Moderators from "./Moderators";
import Stream from "./Stream";

const EventView = () => {
    // used for rerendering navbar on scroll of the main div
    const [navbarRenderer, setNavbarRenderer] = useState(0);
    const { slug } = useParams();
    const navbarRef = useRef<HTMLDivElement>(null);
    const {
        isLoading,
        isSuccess,
        isError,
        data: event,
    } = useQuery(
        ["event", slug],
        () => apiClient.get<Event>(`/events/by-slug/${slug}`),
        {
            select: (r) => r.data,
        }
    );

    useEffect(() => {
        if (isSuccess) document.title = event.title;
    }, [event, isSuccess]);

    if (isLoading) return <LoadingOverlay />;
    if (isError || !slug || !isSuccess)
        return (
            <Center w={"full"} h={"100vh"} p={5}>
                <Heading color={"red"}>
                    There was an error displaying this event, try again later
                </Heading>
            </Center>
        );

    return (
        <PrimaryColorContext.Provider value={event.primaryColor}>
            <VStack w={"full"} h={"100vh"} spacing={0}>
                <Box
                    ref={navbarRef}
                    w={"full"}
                    p={0}
                    zIndex={1000}
                    bgColor={"white"}
                >
                    <Navbar
                        sponsors={event.sponsors}
                        isPast={event.isPast}
                        renderer={navbarRenderer}
                    />
                </Box>
                <Box
                    w={"full"}
                    overflow={"auto"}
                    h={
                        navbarRef.current
                            ? "calc(100vh - " +
                              navbarRef.current.clientHeight +
                              "px)"
                            : "100vh"
                    }
                    onScroll={() => setNavbarRenderer(navbarRenderer + 1)}
                >
                    <Info event={event} />
                    {event.isPast && (
                        <Stream
                            streamId={event.streamId}
                            arenaChatName={event.arenaId}
                            live={event.live}
                        />
                    )}
                    <Speakers speakers={event.speakers} />
                    <Moderators moderators={event.moderators} />
                    {!event.isPast && <Inscriptions event={event} />}
                    <Footer sponsors={event.sponsors} />
                </Box>
            </VStack>
        </PrimaryColorContext.Provider>
    );
};
export default EventView;
