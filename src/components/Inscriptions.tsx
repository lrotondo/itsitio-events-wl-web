import { VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Event } from "../api/types";
import Form from "./Form";
import PostRegister from "./PostRegister";

interface Props {
    event: Event;
}

const Inscriptions = ({ event }: Props) => {
    const [submitted, setSubmitted] = useState(false);

    return (
        <VStack
            w={"full"}
            h={"fit-content"}
            id="inscriptions"
            justifyContent={"center"}
            alignItems={"center"}
            py={12}
        >
            {!submitted ? (
                <Form eventId={event.id} setSubmitted={setSubmitted} />
            ) : (
                <PostRegister event={event} />
            )}
        </VStack>
    );
};
export default Inscriptions;
