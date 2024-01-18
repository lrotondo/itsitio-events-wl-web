import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
// @ts-ignore
import moment from "moment/min/moment-with-locales";
import { useContext } from "react";
import Countdown from "react-countdown";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { PrimaryColorContext } from "../utils/context";

interface Props {
    dateUTC: string;
}

const CountdownComponent = ({ dateUTC }: Props) => {
    const dateInLocal = moment.utc(dateUTC).add(10, "seconds").local();
    const primaryColor = useContext(PrimaryColorContext);
    const queryClient = useQueryClient();
    const { slug } = useParams();

    return (
        <Countdown
            date={dateInLocal.toDate()}
            onComplete={() => {
                queryClient.setQueryData(
                    ["event", slug],
                    // @ts-ignore
                    (oldData: AxiosResponse<Event>) => {
                        console.log(oldData);

                        return {
                            ...oldData,
                            data: { ...oldData.data, live: true, isPast: true },
                        };
                    }
                );
            }}
            renderer={({ days, hours, minutes, seconds }) => (
                <Flex
                    id={"countdown"}
                    py={3}
                    px={8}
                    bgColor={primaryColor}
                    color={"white"}
                    rounded={7}
                    boxShadow={"md"}
                    flexDir={{ base: "column", md: "row" }}
                    w={"full"}
                >
                    <Flex
                        justifyContent={"center"}
                        gap={2}
                        alignItems={{ base: "center", md: "flex-start" }}
                        borderColor={"gray"}
                        borderRightWidth={{ base: 0, md: 1 }}
                        borderBottomWidth={{ base: 1, md: 0 }}
                        pe={{ base: 0, md: 5 }}
                        me={{ base: 0, md: 5 }}
                        pb={{ base: 2, md: 0 }}
                        mb={{ base: 2, md: 0 }}
                        flexDir={{ base: "row", md: "column" }}
                    >
                        <Heading fontSize={"6xl"}>
                            {dateInLocal
                                .format("D")
                                .toString()
                                .padStart(2, "0")}
                        </Heading>
                        <Heading
                            textTransform={"capitalize"}
                            fontWeight={"light"}
                            fontSize={"xl"}
                        >
                            {dateInLocal.locale("es").format("MMMM yyyy")}
                        </Heading>
                    </Flex>
                    <HStack
                        spacing={{ base: 6, md: 12 }}
                        justifyContent={"space-evenly"}
                    >
                        <Item label={"Días"} value={days} />
                        <Item label={"Horas"} value={hours} />
                        <Item label={"Minutos"} value={minutes} />
                        <Item label={"Segundos"} value={seconds} />
                    </HStack>
                </Flex>
            )}
        />
    );
};

interface ItemProps {
    label: string;
    value: number;
}

const Item = ({ label, value }: ItemProps) => {
    return (
        <VStack alignItems={"center"} spacing={0}>
            <Heading>{value.toString().padStart(2, "0")}</Heading>
            <Text fontWeight={"light"} textTransform={"lowercase"}>
                {label}
            </Text>
        </VStack>
    );
};

export default CountdownComponent;
