import { Box } from "@chakra-ui/react";
import { EventSponsor } from "../api/types";
import Sponsors from "./Sponsors";

interface Props {
    sponsors: EventSponsor[];
}

const Footer = ({ sponsors }: Props) => {
    return (
        <Box
            w={"full"}
            mt={5}
            p={10}
            ps={20}
            borderColor={"lightgray"}
            borderTopWidth={1}
        >
            <Sponsors sponsors={sponsors} />
        </Box>
    );
};
export default Footer;
