import { Box, chakra, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { PrimaryColorContext } from "../utils/context";

interface Props {
    streamId: string;
    arenaChatName: string;
    live: boolean;
}

const Stream = ({ streamId, arenaChatName, live }: Props) => {
    // vimeo id contains a hash as parameter in this format: ID?h=hash, youtube id doesn't
    const isVimeo = streamId.includes("?h=");
    const videoIdArray = streamId.split("?h=");
    const primaryColor = useContext(PrimaryColorContext);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://go.arena.im/public/js/arenachatlib.js?p=https:www.itsitioeventos.com&e=${arenaChatName}`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex
            w={"full"}
            justifyContent={"center"}
            alignItems={{ base: "flex-start", md: "center" }}
            py={12}
        >
            <VStack w={"full"} spacing={10}>
                {live && (
                    <Heading color={primaryColor}>¡Estamos en vivo!</Heading>
                )}
                <Flex
                    w={{ base: "full", md: "90%", lg: "85%", xl: "80%" }}
                    h={"fit-content"}
                    id={"stream"}
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    gap={10}
                    p={5}
                    flexDir={{ base: "column", md: "row" }}
                >
                    <VStack
                        alignItems={"center"}
                        spacing={10}
                        flex={{ base: undefined, md: 1 }}
                        w={{ base: "full", md: "fit-content" }}
                        h={"fit-content"}
                    >
                        {!live && <Heading>¿No te conectaste en vivo?</Heading>}
                        <chakra.iframe
                            w={
                                live
                                    ? "full"
                                    : {
                                          base: "full",
                                          md: "70%",
                                          lg: "60%",
                                          xl: "50%",
                                      }
                            }
                            height="500"
                            src={
                                isVimeo
                                    ? // `https://player.vimeo.com/video/${streamId}`
                                      //`https://vimeo.com/event/${videoIdArray[0]}/embed/${videoIdArray[1]}`
                                      //`https://player.vimeo.com/video/810952144?h=4c642f2747`
                                      streamId
                                    : `https://www.youtube-nocookie.com/embed/${streamId}?controls=0`
                            }
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                            rounded={10}
                        ></chakra.iframe>
                        {!live && (
                            <Text fontSize={"xl"}>
                                Mirá la grabación del evento
                            </Text>
                        )}
                    </VStack>
                    {live && arenaChatName!="" && (
                        <Box
                            w={{ base: "full", md: "20rem" }}
                            rounded={10}
                            overflow={"hidden"}
                        >
                            <chakra.div
                                w={"full"}
                                className="arena-chat"
                                data-publisher="https:www.itsitioeventos.com"
                                data-chatroom={arenaChatName}
                                data-position="in-page"
                            ></chakra.div>
                        </Box>
                    )}
                </Flex>
            </VStack>
        </Flex>
    );
};

export default Stream;
