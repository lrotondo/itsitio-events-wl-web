import { Flex, HStack } from "@chakra-ui/react";
import { EventSponsor } from "../api/types";
import NavbarItem from "./NavbarItem";
import Sponsors from "./Sponsors";

interface Props {
    sponsors: EventSponsor[];
    isPast: boolean;
    renderer: number;
}

const Navbar = ({ sponsors, isPast }: Props) => {
    return (
        <HStack w={"full"} justifyContent={"center"} px={[1, 3]} py={5}>
            <Flex
                w={"80%"}
                justifyContent={"space-between"}
                direction={{ base: "column", md: "row" }}
                alignItems={"center"}
                gap={6}
            >
                <Sponsors sponsors={sponsors} />
                <HStack
                    px={12}
                    spacing={[6, 12]}
                    w={["full", "fit-content"]}
                    justifyContent={"center"}
                >
                    <NavbarItem label="Información" href={"#info"} />
                    <NavbarItem label="Oradores" href={"#speakers"} />
                    {!isPast && (
                        <NavbarItem
                            label={"Inscripciones"}
                            href={"#inscriptions"}
                        />
                    )}
                </HStack>
            </Flex>
        </HStack>
    );
};

export default Navbar;
