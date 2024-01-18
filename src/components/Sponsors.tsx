import { HStack, Img } from "@chakra-ui/react";
import { EventSponsor } from "../api/types";

interface Props {
    sponsors: EventSponsor[];
}

const Sponsors = ({ sponsors }: Props) => {
    return (
        <HStack alignItems={"center"} spacing={12}>
            {sponsors.map((s) => (
                <Img
                    src={s.sponsor.logo}
                    alt={s.sponsor.name}
                    key={s.sponsor.id}
                    h={"3rem"}
                    rounded={5}
                />
            ))}
        </HStack>
    );
};

export default Sponsors;
