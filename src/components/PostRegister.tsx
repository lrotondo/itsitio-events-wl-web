import {
    Button,
    Heading,
    HStack,
    Link,
    Text,
    useBoolean,
    VStack,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaCheck, FaGoogle, FaOpera } from "react-icons/fa";
import { Event } from "../api/types";
import { PrimaryColorContext } from "../utils/context";
// @ts-ignore
import moment from "moment/min/moment-with-locales";

interface Props {
    event: Event;
}

const PostRegister = ({ event }: Props) => {
    const [scheduled, setScheduled] = useBoolean();
    const [scheduledOut, setScheduledOut] = useBoolean();
    const date = moment.utc(event.dateUTC);
    const initialDate = date;
    const finalDate = date.clone().add(2, "hours");

    const primaryColor = useContext(PrimaryColorContext);

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${initialDate.format(
        "YYYYMMDD[T]HHmmss[Z]"
    )}%2F${finalDate.format(
        "YYYYMMDD[T]HHmmss[Z]"
    )}&details=%3Ca%20href%3D%22https%3A%2F%2Fwww.itsitioeventos.com%2Fevents%2F${
        event.slug
    }%22%3E${event.title}%3C%2Fa%3E - ${
        event.description
    }&location=Online&text=${event.title}`;

    const body = `&body=%3Ca%20href%3D%22https%3A%2F%2Fwww.itsitioeventos.com%2Fevents%2F${event.slug}%22%3E${event.title}%3C%2Fa%3E - ${event.description}`;
    const urlOutlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${
        event.title
    }&startdt=${encodeURIComponent(
        initialDate.format("YYYY-MM-DDTHH:mm:ssZ")
    )}&enddt=${encodeURIComponent(
        finalDate.format("YYYY-MM-DDTHH:mm:ssZ")
    )}&body=${body}&location=Online&subject=${
        event.title
    }&path=/calendar/action/compose&rru=addevent`;

    return (
        <VStack spacing={8}>
            <Heading color={primaryColor}>¡Ya estás registrado!</Heading>
            <Text fontSize={"lg"}>
                Te llegará un mail con los datos del evento
            </Text>
            <HStack spacing={8}>
                <Button
                    leftIcon={scheduled ? <FaCheck /> : <FaGoogle />}
                    colorScheme={scheduled ? "green" : "orange"}
                    as={Link}
                    href={url}
                    target="_blank"
                    onClick={(e) => {
                        e.preventDefault();
                        window.open(url, "popup", "width=800, height=600");
                        setScheduled.on();
                    }}
                >
                    {scheduled ? "Agendado" : "Agendar"} en Google Calendar
                </Button>
                <Button
                    leftIcon={scheduledOut ? <FaCheck /> : <FaOpera />}
                    colorScheme={scheduledOut ? "green" : "orange"}
                    as={Link}
                    href={urlOutlook}
                    target="_blank"
                    onClick={(e) => {
                        e.preventDefault();
                        window.open(
                            urlOutlook,
                            "popup",
                            "width=800, height=600"
                        );
                        setScheduledOut.on();
                    }}
                >
                    {scheduledOut ? "Agendado" : "Agendar"} en Outlook Calendar
                </Button>
            </HStack>
        </VStack>
    );
};

export default PostRegister;
